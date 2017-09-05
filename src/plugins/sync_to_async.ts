import * as types from "babel-types";
import { compact, uniq, chain, get } from "lodash";

function isUIWidgetExpression(name) {
  return /^zd((Combo)?Select)?Menu$/.test(name);
}

function replaceReferencesForBinding(binding) {
  let exp;
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
    exp = path.findParent(p => {
      if (
        (!p.parentPath.isMemberExpression() &&
          !p.parentPath.isCallExpression()) ||
        ((p.isCallExpression() && p.inList) ||
          (p.parentPath.isMemberExpression() &&
            /^(then|bind)$/.test(p.parent.property.name)))
      ) {
        return true;
      }
      if (p.isMemberExpression()) {
        names.push(p.node.property.name);
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

const syncToAsyncVisitor = {
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
    if (isUIWidgetExpression(name)) {
      cache.set("uiWidgets", true);
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
    if (
      (obj = cache.get(name)) &&
      obj.async &&
      !exp.parentPath.isAwaitExpression()
    ) {
      exp.replaceWith(types.awaitExpression(exp.node));
      exp.skip();
      toAsync = true;
    } else if (apis.has(name)) {
      if (exp.node.arguments.length) {
        let nexp;
        if (/^(ticket|user|organization)Fields$/.test(name)) {
          const fieldName = `${name}:${exp.get("arguments.0").node.value}`;
          nexp = buildWrapZafClientExpression(fieldName);
        } else {
          nexp = buildWrapZafClientExpression(names, ...exp.node.arguments);
        }
        if (nexp) {
          exp.replaceWith(nexp);
          exp.skip();
          toAsync = true;
        }
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
      if (id) {
        if (names.length) {
          exp.replaceWithSourceString(`${id.name}.${names.join(".")}`);
          if (exp.parentPath.isVariableDeclarator()) {
            const binding = opCache.scope.bindings[exp.parent.id.name];
            replaceReferencesForBinding(binding);
          }
        } else {
          exp.replaceWith(id);
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

interface IManifest {
  [key: string]: any; // number | object | string | boolean
  location?: string | string[];
  noTemplate?: string | string[];
}

function hasLocation(manifest: IManifest, name: string): boolean {
  let { location, noTemplate } = manifest;
  let allLocations: string[] = [].concat(location, noTemplate);
  return chain(allLocations)
    .compact()
    .uniq()
    .some((loc: string) => new RegExp(name).test(loc))
    .value();
}

export default (json, path, cache) => {
  const hasTicket = hasLocation(json, "ticket");
  const hasUser = hasLocation(json, "user");
  const hasOrg = hasLocation(json, "organization");
  const apis = new Map<string, boolean>([
    ["ticket", hasTicket],
    ["user", hasUser],
    ["organization", hasOrg],
    ["currentUser", true],
    ["currentAccount", true],
    ["ticketFields", hasTicket],
    ["userFields", hasUser],
    ["organizationFields", hasOrg]
  ]);
  // This is where all the changes will be made to the v1 AST
  const container = path.get("argument.properties");
  path.traverse(syncToAsyncVisitor, {
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
    if (methodName !== "uiWidgets" && meta.async) asyncMethods.push(methodName);
  }
  let methodName;
  while ((methodName = asyncMethods.pop())) {
    path.traverse(syncToAsyncVisitor, {
      cache,
      apis,
      container,
      methodName,
      asyncMethods
    });
  }
};
