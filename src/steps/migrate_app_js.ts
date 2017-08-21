import { parse } from "babylon";
import * as types from "babel-types";
import traverse from "babel-traverse";
import generate from "babel-generator";
import { Map } from "immutable";
import { uniqueId, compact, uniq, chain, last, get } from "lodash";
import { format } from "prettier";
import * as chalk from "chalk";
import {
  getDepthOfPath,
  findLowestDepthPath,
  requireStatementProcessorFactory
} from "../utils";

interface IManifest {
  [key: string]: any; // number | object | string | boolean
  location?: string | string[];
  noTemplate?: string | string[];
}

function runsInLocation(manifest: IManifest, name: string): boolean {
  let { location, noTemplate } = manifest;
  if (!location && !noTemplate) return false;
  location = Array.isArray(location) ? location : [location];
  let allLocations: string[] = [].concat(location, noTemplate);
  return chain(allLocations)
    .compact()
    .uniq()
    .some((loc: string) => new RegExp(name).test(loc))
    .value();
}

function buildMemberExpressionFromCache(
  names: string[],
  apiCache = {}
): types.Expression {
  let id: string, newExpression: types.Expression, partId: string;
  // apiCache["makeTicketLinks"] = "_makeTicketLinks"
  const leafName: string = last<string>(names);
  const missingParts: string[] = [];
  const parts: string[] = names.length > 1 ? names.slice(0, -1) : names.slice();
  while ((partId = parts.pop())) {
    if ((id = apiCache[partId])) {
      // We have a match. The preceding part was already declared
      missingParts.push(leafName);
      newExpression = types.memberExpression(
        types.identifier(id),
        types.identifier(missingParts.shift())
      );
      if (missingParts.length) {
        let missingPartId: string;
        while ((missingPartId = missingParts.shift())) {
          newExpression = types.memberExpression(
            newExpression,
            types.identifier(missingPartId)
          );
        }
      }
      break;
    } else {
      // console.log("No match found, adding", partId);
      missingParts.unshift(partId);
    }
  }
  return newExpression;
}

function parseSyncCallExpression(initialPath, path) {
  let toGet: string;
  const names: string[] = [];
  const lastPath = initialPath.findParent(p => {
    const pp = p.parentPath;
    if (pp.isMemberExpression() || pp.isCallExpression()) {
      if (Array.isArray(p.container) && p.container.length) return true;
      if (p.isMemberExpression() && p.node.property.name !== "bind") {
        names.push(p.node.property.name);
      }
      return false;
    }
    return true;
  });

  toGet = lastPath.inList
    ? `${lastPath.listKey}.${lastPath.key}`
    : lastPath.parentKey;
  return { parentStatementPath: lastPath.parentPath, toGet, names };
}

function getAppApiScope(path, appApis: Map<string, any>) {
  const op = path.findParent(pth => {
    return pth.isObjectProperty() && appApis.has(pth.node.key.name);
  });
  return (
    op && types.isFunctionExpression(op.node.value) && op.get("value").scope
  );
}

const syncToAsyncVisitor = {
  Identifier(idPath, { path, name, v1Apis, appApis, identifierCache }) {
    let apiCache,
      apiName = idPath.node.name,
      isV1Api = v1Apis[apiName],
      isAppApi = !isV1Api && appApis.has(apiName);
    if ((!isAppApi && !isV1Api) || apiName === name) return;
    if (isAppApi) {
      const apiPath = appApis.get(apiName);
      if (apiPath.isObjectProperty()) {
        if (
          types.isFunctionExpression(apiPath.node.value) &&
          !apiPath.node.value.async
        )
          return;
      }
    }
    console.log(chalk.underline.bold.green(name));
    if (types.isThisExpression(idPath.parent.object) && apiName) {
      const { names, toGet, parentStatementPath } = parseSyncCallExpression(
        idPath,
        path
      );
      const scope =
        getAppApiScope(parentStatementPath, appApis).scope ||
        parentStatementPath.getFunctionParent().scope;
      apiCache = identifierCache[name] || (identifierCache[name] = {});
      const originalExpression: types.Expression = parentStatementPath.get(
        toGet
      ).node;

      let newExpression: types.Expression;
      if (isAppApi) {
        if (!types.isAwaitExpression(originalExpression)) {
          newExpression = types.awaitExpression(originalExpression);
          parentStatementPath.get(toGet).replaceWith(newExpression);
          parentStatementPath.get(toGet).skip();
        }
        return;
      }
      // Try build an expression using a previously defined binding
      newExpression = buildMemberExpressionFromCache(names, apiCache);
      // There wasn't any previously defined binding, so create one
      if (!newExpression) {
        const id = scope.generateUidIdentifier(apiName);
        scope.push({
          id,
          kind: "const",
          init: types.awaitExpression(
            types.callExpression(types.identifier("wrapZafClient"), [
              types.stringLiteral(apiName)
            ])
          )
        });
        apiCache[apiName] = id.name;
        // Now that we have a binding, we can build a reference to that binding
        newExpression = buildMemberExpressionFromCache(names, apiCache);
      }
      switch (parentStatementPath.node.type) {
        case "VariableDeclarator":
          parentStatementPath.get(toGet).replaceWith(newExpression);
          const bindingName = parentStatementPath.node.id.name;
          apiCache[bindingName] = bindingName;
          break;

        case "Property":
        case "ObjectProperty":
        case "IfStatement":
        case "CallExpression":
        case "AwaitExpression":
        case "BinaryExpression":
        case "AssignmentExpression":
        case "ConditionalExpression":
        case "ExpressionStatement":
          parentStatementPath.get(toGet).replaceWith(newExpression);
          break;

        default:
          console.log(`Missing: ${parentStatementPath.node.type}`);
          console.log(generate(parentStatementPath.node).code, toGet);
      }
      console.log(generate(path.node).code);
      if (path.isFunctionExpression()) {
        console.log(`FE: Set ${name} to async`);
        path.node.async = true;
      } else if (path.isObjectProperty()) {
        console.log(`OP: Set ${name} to async`);
        path.node.value.async = true;
      }
    }
  }
};

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const experimental: boolean = options.get("experimental");
  const hasCommonJS: boolean = options.get("hasCommonJS");
  const appJS = editor.read(`${src}/app.js`);

  let code: string = `
    (function() {
      return { /* no-op */ };
    }());
  `;

  const copyOptions: { code: string; helpers?: string } = { code, helpers: "" };

  // Parse all of the v1 app.js Javascript into an AST
  const ast = parse(appJS);

  // Traverse the AST to find the v1 `return` statement that actually
  // returns the app subclass
  const v1ReturnStatementPath = findLowestDepthPath(ast, "ReturnStatement");

  if (v1ReturnStatementPath) {
    const iifePath = v1ReturnStatementPath.findParent(path =>
      path.isExpressionStatement()
    );

    if (types.assertExpressionStatement(iifePath.node)) {
      ast.program = types.program([iifePath.node]);
    }
    if (experimental) {
      const manifestJson = editor.readJSON(`${src}/manifest.json`, {
        location: []
      });

      const v1Apis: {
        ticket?: boolean;
        user?: boolean;
        organization?: boolean;
      } = {
        ticket: runsInLocation(manifestJson, "ticket"),
        user: runsInLocation(manifestJson, "user"),
        organization: runsInLocation(manifestJson, "organization")
      };
      const appApis = v1ReturnStatementPath
        .get("argument.properties")
        .filter(
          path =>
            types.isCallExpression(path.node.value) ||
            types.isFunctionExpression(path.node.value)
        )
        .reduce((memo, path) => {
          return memo.set(path.node.key.name, path);
        }, Map());

      let isAsync = false;
      const identifierCache = {};
      for (let [name, path] of appApis) {
        if (types.isCallExpression(path.node.value)) {
          const argPath = path.get("value.arguments.0");
          if (argPath.isFunctionExpression()) {
            path = argPath;
          }
        }

        // FIXME? This is flakey, hard to say whether the first arg
        // to a call expression will be the actual function
        path.traverse(syncToAsyncVisitor, {
          path,
          name,
          v1Apis,
          appApis,
          identifierCache
        });
        if (!isAsync) {
          isAsync = path.isFunctionExpression()
            ? path.node.async
            : path.node.value.async;
        }
      }

      if (isAsync && Object.keys(v1Apis).some(v => v1Apis[v])) {
        // FIXME: This helper should go somewhere else.  It could potentially be
        // included as an import?
        copyOptions.helpers = `
          const wrapZafClient = async (apiPath, method = "get") => {
            try {
              const client = ZAFClient.init();
              const { [apiPath]: result } = await client[method](apiPath);
              return result;
            } catch ({ message }) {
              console.error(message);
            }
          };
        `;
      }
    }
    // Generate the final JavaScript for the app subclass definition
    code = generate(ast).code;

    // Check whether the migrate_common_js step discovered some Common JS files
    if (hasCommonJS) {
      const requireProcessor = requireStatementProcessorFactory(options);
      requireProcessor(code, `${src}/app.js`);
    }

    copyOptions.code = code;
  }

  const indexTpl = "./src/templates/legacy_app.ejs";
  const destJS = `${dest}/src/javascripts/legacy_app.js`;
  editor.copyTpl(indexTpl, destJS, copyOptions);
  // FIXME: Unfortunately, `copyTpl` doesn't work as advertised,
  // it _should_ allow a process function that would make it possible
  // to format the contents of the file during the copy operation... :(
  editor.write(destJS, format(editor.read(destJS)));
};
