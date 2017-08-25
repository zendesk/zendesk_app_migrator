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

function hasLocation(manifest: IManifest, name: string): boolean {
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
  const leafName: string = last<string>(names);
  console.log(names);
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
      missingParts.unshift(partId);
    }
  }
  return newExpression;
}

function findCallExpression(initialPath, path) {
  let toGet: string;
  const names: string[] = [];
  console.log(generate(initialPath.node).code, initialPath.node.type);
  const lastPath = initialPath.findParent(p => {
    const pp = p.parentPath;
    console.log(pp.node.type);
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
  const args: any[] =
    (lastPath.isCallExpression() &&
      lastPath.node.arguments.length &&
      lastPath.node.arguments) ||
    [];
  console.log(toGet);
  return { parentStatementPath: lastPath.parentPath, toGet, names, args };
}

function getOwnApiScope(path, ownApis: Map<string, any>) {
  const op = path.findParent(pth => {
    return pth.isObjectProperty() && ownApis.has(pth.node.key.name);
  });
  if (!op || !types.isFunctionExpression(op.node.value)) {
    return path.getFunctionParent().scope;
  }
  return op.get("value").scope;
}

const syncToAsyncVisitor = {
  Identifier(idPath, { path, name, v1Apis, ownApis, identifierCache }) {
    let apiCache,
      apiName = idPath.node.name,
      isV1Api = !!v1Apis[apiName],
      isOwnApi = !isV1Api && ownApis.has(apiName);
    if ((!isOwnApi && !isV1Api) || apiName === name) return;
    if (isOwnApi) {
      const apiPath = ownApis.get(apiName);
      if (apiPath.isObjectProperty()) {
        if (
          types.isFunctionExpression(apiPath.node.value) &&
          !apiPath.node.value.async
        )
          return;
      }
    }
    let newExpression: types.Expression,
      parentStatementPath,
      toGet,
      names,
      args;
    // Initialise the api cache for this app function
    apiCache = identifierCache[name] || (identifierCache[name] = {});
    // We only care about this expressions that are either a v1 api call
    // or a call to an app function that has become async
    if (types.isThisExpression(idPath.parent.object) && apiName) {
      ({ names, toGet, parentStatementPath, args } = findCallExpression(
        idPath,
        path
      ));
      // Get the containing scope, this should be the scope of the app
      // function being iterated on
      const scope = getOwnApiScope(parentStatementPath, ownApis);
      // If this is a v1 api call, and we have args we should just do
      // a replacement for a wrapped SDK call
      if (isV1Api && args.length) {
        newExpression = types.awaitExpression(
          types.callExpression(types.identifier("wrapZafClient"), [
            types.stringLiteral(names.join(".")),
            ...args
          ])
        );
        parentStatementPath.get(toGet).replaceWith(newExpression);
        parentStatementPath.get(toGet).skip();
        return;
      }
      // We can simply wrap and replace an own api in an await
      if (isOwnApi) {
        const toReplaceExpression: types.Expression = parentStatementPath.get(
          toGet
        ).node;
        if (!types.isAwaitExpression(toReplaceExpression)) {
          newExpression = types.awaitExpression(toReplaceExpression);
          parentStatementPath.get(toGet).replaceWith(newExpression);
          parentStatementPath.get(toGet).skip();
        }
        return;
      }
      // Try build an expression using a previously defined binding
      // If there wasn't any previously defined binding, create one
      if (!(newExpression = buildMemberExpressionFromCache(names, apiCache))) {
        const awaitExpression = types.awaitExpression(
          types.callExpression(types.identifier("wrapZafClient"), [
            types.stringLiteral(apiName)
          ])
        );
        // If the parent is a declaration, we can reuse that binding
        // otherwise, add a new binding for the v1 api call
        if (
          !parentStatementPath.isVariableDeclarator() ||
          (parentStatementPath.isVariableDeclarator() && names.length > 1)
        ) {
          const id = scope.generateUidIdentifier(apiName);
          scope.push({
            id,
            kind: "const",
            init: awaitExpression
          });
          apiCache[apiName] = id.name;
          // Now that we have a binding, we can build a reference to that binding
          newExpression = buildMemberExpressionFromCache(names, apiCache);
        } else {
          if (
            parentStatementPath.node.id.name === apiName &&
            scope.hasBinding(apiName) &&
            scope.bindings[apiName].referenced
          ) {
            console.log("We have an existing declaration for:", apiName);
            console.log(generate(parentStatementPath.get(toGet)).code, names);
            const { name: newName } = scope.generateUidIdentifier(apiName);
            apiCache[apiName] = newName;
            scope.rename(apiName, newName);
            // scope.bindings[newName].referencePaths.forEach(refPath => {
            //   const {
            //     names: n,
            //     toGet: tg,
            //     parentStatementPath: ps
            //   } = findCallExpression(refPath, path);
            //   const ne = buildMemberExpressionFromCache(
            //     [apiName, ...n],
            //     apiCache
            //   );
            //   console.log(generate(ps.get(tg)).code);
            //   ps.get(tg).replaceWith(ne);
            // });
          }
          newExpression = awaitExpression;
        }
      }
    }
    if (!parentStatementPath || !newExpression) {
      return;
    }
    const parentStatementType = parentStatementPath.node.type;
    switch (parentStatementType) {
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
        const toReplacePath = parentStatementPath.get(toGet);
        toReplacePath.replaceWith(newExpression);
        break;

      default:
        console.log(`Missing: ${parentStatementPath.node.type}`);
        console.log(generate(parentStatementPath.node).code, toGet);
    }

    if (path.isFunctionExpression()) {
      path.node.async = true;
    } else if (path.isObjectProperty()) {
      path.node.value.async = true;
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
        currentUser: boolean;
        ticket?: boolean;
        user?: boolean;
        organization?: boolean;
      } = {
        currentUser: true, // Every location has currentUser
        ticket: hasLocation(manifestJson, "ticket"),
        user: hasLocation(manifestJson, "user"),
        organization: hasLocation(manifestJson, "organization")
      };
      const ownApis = v1ReturnStatementPath
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
      for (let [name, path] of ownApis) {
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
          ownApis,
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
          const wrapZafClient = async (apiPath, ...rest) => {
            try {
              let result;
              const client = ZAFClient.init();
              // If we have args, this is a set or invoke.
              // Everything else should be a get
              // Use destructuring to get the value from path on 
              // result object
              if (rest.length) {
                ({ [apiPath]: result } = await client.set(apiPath, ...rest));
              } else {
                ({ [apiPath]: result } = await client.get(apiPath));
              }
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
