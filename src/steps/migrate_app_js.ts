import { parse } from "babylon";
import * as types from "babel-types";
import traverse from "babel-traverse";
import generate from "babel-generator";
import { compact, uniq, chain, get } from "lodash";
import { format } from "prettier";
import { getDepthOfPath, findLowestDepthPath } from "../utils";

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

function isRequire(path) {
  return (
    path.get("callee").isIdentifier() &&
    path.node.callee.name === "require" &&
    path.get("arguments.0").isStringLiteral()
  );
}

function replaceReferencesForBinding(binding) {
  let exp;
  // const parentName = exp.parent.id.name;
  if (binding.referenced) {
    const name = binding.identifier.name;
    binding.referencePaths.forEach(p => {
      const { exp: e, names: n } = getExpressionToReplace(p);
      if (n.length) {
        e.replaceWithSourceString(`${name}${"." + n.join(".")}`);
        if (e.parentPath.isVariableDeclarator()) {
          replaceReferencesForBinding(
            e.parentPath.scope.bindings[e.parent.id.name]
          );
        } else if (
          e.inList &&
          (exp = e.getSibling(e.key + 1)) &&
          exp.isFunctionExpression() &&
          exp.node.params.length
        ) {
          const b = exp.scope.bindings[exp.get("params.0").node.name];
          replaceReferencesForBinding(b);
        }
      }
    });
  }
}

function getExpressionToReplace(path) {
  const names = [],
    exp = path.findParent(path => {
      if (
        (!path.parentPath.isMemberExpression() &&
          !path.parentPath.isCallExpression()) ||
        ((path.isCallExpression() && path.inList) ||
          (path.parentPath.isMemberExpression() &&
            /^(then|bind)$/.test(path.parent.property.name)))
      ) {
        return true;
      }
      if (path.isMemberExpression()) {
        names.push(path.node.property.name);
      }
      return false;
    });
  return {
    exp,
    names
  };
}

function buildWrapZafClientExpression(
  path: string | string[],
  ...rest
): types.AwaitExpression {
  if (Array.isArray(path)) path = path.join(".");
  return types.awaitExpression(
    types.callExpression(types.identifier("wrapZafClient"), [
      types.memberExpression(
        types.thisExpression(),
        types.identifier("zafClient")
      ),
      types.stringLiteral(path)
    ])
  );
}

const migrateJsVisitor = {
  StringLiteral(path) {
    if (
      path.isObjectProperty() &&
      path.get("value").isObjectExpression() &&
      path.node.key.name === "events"
    ) {
      if (path.node.value === "pane.activated") {
        path.node.value = "app.activated";
        path.stop();
      }
    }
  },
  "ObjectProperty|ObjectMethod"(path, { cache, container, asyncMethods }) {
    // If we have asyncMethods, it means we already have all the method names
    if (asyncMethods) return;
    if (!(path.inList && container.includes(path))) return;
    const vp = path.isObjectProperty() ? path.get("value") : path.get("body");
    if (
      (vp.isFunctionExpression() && !cache.has(path.node.key.name)) ||
      vp.isCallExpression() ||
      vp.isBlockStatement()
    ) {
      let arg,
        scope = vp.scope;
      if (!scope) {
        if (
          vp.isCallExpression() &&
          (arg = vp.get("arguments.0")) &&
          arg.isFunctionExpression()
        ) {
          scope = arg.scope;
        }
      }
      if (!scope) return;
      // Note: we need to set the immutable map back to the state here,
      // hence not destructuring the state argument. Destructuring _would_
      // work for a native Map, but not an immutable
      cache.set(path.node.key.name, { scope });
    }
  },
  MemberExpression(path, { cache, apis, methodName, asyncMethods }) {
    let name = path.node.property.name,
      id,
      obj,
      toAsync = false;
    if (/^zd((Combo)?Select)?Menu$/.test(name)) {
      cache.set("importZendeskMenus", true);
      return;
    }
    if (!path.get("object").isThisExpression()) return;
    const op = path.findParent(path => {
      return path.isObjectProperty() && cache.has(path.node.key.name);
    });
    if (!op) return;
    const opName = op.node.key.name;
    const opCache = cache.get(opName);
    if ((methodName && name !== methodName) || opName === methodName) return;
    const { exp, names } = getExpressionToReplace(path);
    if ((obj = cache.get(name)) && obj.async) {
      exp.replaceWith(types.awaitExpression(exp.node));
      exp.skip();
      toAsync = true;
    } else if (apis.has(name)) {
      if (exp.node.arguments.length) {
        exp.replaceWith(
          buildWrapZafClientExpression(names, ...exp.node.arguments)
        );
        exp.skip();
        toAsync = true;
      } else if (exp.parentPath.isVariableDeclarator() && !names.length) {
        opCache[name] = exp.parent.id;
        exp.replaceWith(buildWrapZafClientExpression(name));
        const binding = opCache.scope.bindings[exp.parent.id.name];
        replaceReferencesForBinding(binding);
        toAsync = true;
      } else if (!(id = opCache[name])) {
        id = opCache.scope.generateUidIdentifier(name);
        opCache.scope.push({
          id,
          kind: "const",
          init: buildWrapZafClientExpression(name)
        });
        opCache[name] = id;
        toAsync = true;
      }
      if (id && names.length) {
        exp.replaceWithSourceString(`${id.name}.${names.join(".")}`);
        if (exp.parentPath.isVariableDeclarator()) {
          const binding = opCache.scope.bindings[exp.parent.id.name];
          replaceReferencesForBinding(binding);
        }
        toAsync = true;
      }
    }
    if (!toAsync) return;
    if (asyncMethods && !asyncMethods.includes(opName)) {
      asyncMethods.push(opName);
    }
    op.node.value.async = true;
    opCache.async = true;
  }
};

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const experimental: boolean = options.get("experimental");
  const appJS = editor.read(`${src}/app.js`);

  let code: string = `
    (function() {
      return { /* no-op */ };
    }());
  `;

  const copyOptions: { code: string; helpers: { [key: string]: boolean } } = {
    code,
    helpers: {}
  };

  // Parse all of the v1 app.js Javascript into an AST
  const ast = parse(appJS);

  // Traverse the AST to find the v1 `return` statement that actually
  // returns the app subclass
  const returnStatementPath = findLowestDepthPath(ast, "ReturnStatement");
  if (returnStatementPath) {
    const iifePath = returnStatementPath.findParent(path =>
      path.isExpressionStatement()
    );
    if (iifePath.isExpressionStatement()) {
      ast.program = types.program([iifePath.node]);
    }
    // Process any require statements to make them
    // relative to the lib folder.  No need to actually
    // resolve a file here
    returnStatementPath.traverse({
      CallExpression(path) {
        if (isRequire(path)) {
          const pathToModule = path.get("arguments.0").node.value;
          if (!/^\.\/lib\//.test(pathToModule)) {
            path
              .get("arguments.0")
              .replaceWithSourceString(`"./lib/${pathToModule}"`);
          }
        }
      }
    });

    if (experimental) {
      const manifestJson = editor.readJSON(`${src}/manifest.json`, {
        location: []
      });

      const cache = new Map<
        string,
        { async?: boolean; scope?: {}; boolean; [key: string]: any }
      >();
      const apis = new Map<string, boolean>([
        ["ticket", hasLocation(manifestJson, "ticket")],
        ["user", hasLocation(manifestJson, "user")],
        ["organization", hasLocation(manifestJson, "organization")],
        ["currentUser", true],
        ["currentAccount", true]
      ]);
      // This is where all the changes will be made to the v1 AST
      const container = returnStatementPath.get("argument.properties");
      returnStatementPath.traverse(migrateJsVisitor, {
        cache,
        apis,
        container
      });

      // It's possible at this point that there are some app methods that have
      // become async, and are being called from another method.  The migrateJsVisitor tries
      // to update these references as it processes each node, but can only do so when they appear
      // in a method _after_ the one currently being processed.  We'll need to repeatedly process
      // until all references to async methods have await statements
      const asyncMethods = [];
      for (const [methodName, meta] of cache) {
        if (methodName !== "importZendeskMenus" && meta.async)
          asyncMethods.push(methodName);
      }
      let methodName;
      while ((methodName = asyncMethods.pop())) {
        returnStatementPath.traverse(migrateJsVisitor, {
          cache,
          apis,
          container,
          methodName,
          asyncMethods
        });
      }

      if (cache.has("importZendeskMenus")) {
        editor.copy(
          "./src/templates/zendesk_menus.js",
          `${dest}/lib/javascripts/zendesk_menus.js`
        );
        editor.write(`${dest}/.eslintignore`, "**/zendesk_menus.js");
        copyOptions.helpers.menus = true;
        options = options.set("importZendeskMenus", true);
      }

      // If any of the methods have been changed to async (because they _now_ use the SDK)
      // This should only be the case if the app uses a core API, like `this.currentUser()`, or
      // if it uses a location-specific API, like `this.user()` or `this.ticket()`
      for (const [key, value] of cache) {
        if ((copyOptions.helpers.async = get(value, "async", false))) break;
      }
    }
    // Generate the final JavaScript for the app subclass definition
    copyOptions.code = generate(ast).code;
  }

  const indexTpl = "./src/templates/legacy_app.ejs";
  const destJS = `${dest}/src/javascripts/legacy_app.js`;
  editor.copyTpl(indexTpl, destJS, copyOptions);
  // FIXME: Unfortunately, `copyTpl` doesn't work as advertised,
  // it _should_ allow a process function that would make it possible
  // to format the contents of the file during the copy operation... :(
  editor.write(destJS, format(editor.read(destJS)));
  return options;
};
