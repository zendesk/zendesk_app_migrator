import * as types from "babel-types";
import { compact, uniq, chain, get } from "lodash";

/**
 * Tests the name of a member expression's identifier
 * to check whether it is a call to a UI Widgets (jQuery adapter) API
 *
 * @param {any} name 
 * @returns {boolean} 
 */
function isUIWidgetExpression(name): boolean {
  return /^zd((Combo)?Select)?Menu$/.test(name);
}

/**
 * Recursively replaces expressions that refer to a given binding.
 * This method is primarily for converting v1 api calls to wrappers
 * to direct property access.  The replacement is predicated on an
 * object being returned from an async/await expression for a wrapped
 * SDK client call.
 * 
 * @param {any} binding 
 */
function replaceReferencesForBinding(binding): void {
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

/**
 * This method extracts a complete expression that comprises a v1 api call
 * An example would be `var email = this.ticket().requester().email()`.
 * In the above case, the value of `exp` would be a Babel path object
 * containing all of the nodes for `this.ticket().requester().email()`.
 * The value of `names`, in the same case, would be `["ticket", "requester", "email"]`.
 * 
 * @param {any} path 
 * @returns {{ exp: any; names: string[] }} 
 */
function getExpressionToReplace(path): { exp: any; names: string[] } {
  const names = [],
    exp = path.findParent(p => {
      // As long as the parent expression is either a MemberExpression, or a
      // CallExpression, keep on walking up the AST.  If we hit a parent that is
      // in a list (`inList`), then we've likely found the complete expression.
      // We need to explicitly exclude the "native" `bind` and `then` property names.
      // Those two names "look" like a continuation of the same chained expression, but
      // they're obviously not.
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

/**
 * Builds the AST nodes for an await expression to call the
 * `wrapZafClient` helper method injected for async support.
 * 
 * @param {(string | string[])} path 
 * @param {any} rest 
 * @returns {types.AwaitExpression} 
 */
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
      types.stringLiteral(path),
      ...rest
    ])
  );
}

// This is the visitor object that instructs babel-traverse what to do when
// encountering nodes of a certain type.  The majority of this visitor relates
// to identifying synchronous v1 api calls, then rewriting them to asynchronous
// v2 api calls (via a shim/helper, that will be injected).
const syncToAsyncVisitor = {
  "ObjectProperty|ObjectMethod"(path, { cache, container, asyncMethods }) {
    // This visitor method is to identify the methods of a v1 app, as defined
    // (in code) by the app developer. ObjectMethods or ObjectProperties that are
    // direct children of the v1 app's return block, i.e. `container`.  Only FunctionExpression,
    // CallExpression and/or BlockStatements will be allowed as values of an app method.
    // If we have asyncMethods, it means we already have all the method names.
    // We'd have asyncMethods if we were parsing again to ensure references to
    // app methods that had become async in the first pass.
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
        // If the method declaration is in the form `{ foo: _.debounce(function() { ...  })  }`
        // (which is quite common), then we should take the first argument to the CallExpression,
        // in this case `_.debounce()`, to be the actual app method FunctionExpression.
        // FIXME: This check could be made more explicit by testing whether `_` is the object on
        // which the call is being made.  We could then, if necessary, whitelist some of the relevant
        // Underscore methods (and their signature), i.e. `["debounce", "delay", "throttle"]`.
        if (
          vp.isCallExpression() &&
          (arg = vp.get("arguments.0")) &&
          arg.isFunctionExpression()
        ) {
          scope = arg.scope;
        }
      }
      // We may have encountered an unexpected expression if there is no scope.
      if (!scope) return;
      // Create an object to store metadata about the current app
      // method.  Store the scope of the app method, so as to be
      // able to push binding declarations there later.
      cache.set(path.node.key.name, { scope });
    }
  },
  MemberExpression(path, { cache, apis, methodName, asyncMethods }) {
    // `name` will be the property/method name being called.  Some examples
    // would be "ticket" in `this.ticket()` or "user" in `this.user()`. It could
    // also be "events" for `{ events: {} }` in an app, but we will exclude those
    // references later in this method.
    let name = path.node.property.name,
      id,
      obj,
      toAsync = false;
    // Check whether this expression is a UI Widget call.
    if (isUIWidgetExpression(name)) {
      // Set a flag so that we can later inject the UI Widget
      // JavaScript/CSS, and a helper to initialise the library.
      cache.set("uiWidgets", true);
      return;
    }
    // Because we're looking for either v1 api calls, or calls to
    // other app methods, we only care about ThisExpression's.
    if (!path.get("object").isThisExpression()) return;
    // `op` will be the containing app method definition, one of
    // the direct children of the `container`.
    const op = path.findParent(path => {
      return path.isObjectProperty() && cache.has(path.node.key.name);
    });
    // Short-circuit if we're not inside an app method, we may be inside
    // a closure-local method defined in the v1 IIFE.
    if (!op) return;
    const opName = op.node.key.name;
    // Get the cache defined previously in the visitor for
    // (ObjectMethod|ObjectProperty)
    const opCache = cache.get(opName);
    // If we have a methodName defined then we're in the second phase/pass
    // looking for references to other app methods.  If we're inside the same
    // method we're looking for, short-circuit.
    if ((methodName && name !== methodName) || opName === methodName) return;
    // Get the entire expression we want to replace.  `exp` will be the path
    // object that wraps the entire expression, i.e. `this.ticket().requester().email()`.
    // `names` will be an array of names in the expression, i.e. ["ticket", "requester", "email"]
    const { exp, names } = getExpressionToReplace(path);
    // If this expression is a call to an app method, and that method is async (already)
    // and the parent of the exp isn't wrapped in an await, then wrap, i.e.
    // If we have `{ foo: async function() { ... }, bar: function() { var foo = this.foo(); } }`
    // and we're inside `bar`, then `exp` will be `this.foo()`.  We'll replace
    // with `await this.foo()` (and later make `foo` async too).
    if (
      (obj = cache.get(name)) &&
      obj.async &&
      !exp.parentPath.isAwaitExpression()
    ) {
      exp.replaceWith(types.awaitExpression(exp.node));
      exp.skip();
      toAsync = true;
    } else if (apis.has(name)) {
      // If `name` appears in `apis`, it will be a call to a v1 api.
      // Next, try work out whether it is a get, set, or invoke (depending
      // on whether there were any arguments passed to the exp).
      if (exp.node.arguments.length) {
        let nexp;
        const rest = exp.node.arguments.slice(1);
        // If the method is one of ticketFields, userFierlds or organizationFields
        // then we need to create a v2 path that uses the colon-delimited style, i.e.
        // `ticketFields:brand`
        if (/^(ticket|user|organization)Fields$/.test(name)) {
          const fieldName = `${name}:${exp.get("arguments.0").node.value}`;
          nexp = buildWrapZafClientExpression(fieldName, ...rest);
        } else {
          nexp = buildWrapZafClientExpression(names, ...rest);
        }
        if (nexp) {
          exp.replaceWith(nexp);
          exp.skip();
          toAsync = true;
        }
      } else if (exp.parentPath.isVariableDeclarator() && !names.length) {
        // If the exp is an assignment of one of the "root" v1 apis, i.e.
        // `var ticket = this.ticket();`, then we can reuse the binding.
        // In this case, we'll simply replace the right side of the assignment
        // with the new await expression.  We also update the cache for this
        // method so that it has a reference to the existing binding we're reusing.
        opCache[name] = exp.parent.id;
        exp.replaceWith(buildWrapZafClientExpression(name));
        // Babel will already have a reference for the binding, since
        // it was pre-existing.
        const binding = opCache.scope.bindings[exp.parent.id.name];
        // Since we're reusing an existing binding, we need to process any
        // references to that binding to update wrapper method calls to
        // direct property references, i.e. instead of `this.ticket().requester()`
        // we would replace with `ticket.requester` (assuming that `ticket` was the
        // binding that was being reused).
        replaceReferencesForBinding(binding);
        toAsync = true;
      } else if (!(id = opCache[name])) {
        // If we don't have an existing cached reference to a binding for this
        // v1 api, then we will create a new binding in the scope, and store a
        // reference to it in the cache, i.e. `{ ticket: "_ticket2"  }`.
        id = opCache.scope.generateUidIdentifier(name);
        // This hoists the new variable to the method scope
        opCache.scope.push({
          id,
          kind: "const",
          init: buildWrapZafClientExpression(name)
        });
        opCache[name] = id;
        toAsync = true;
      }
      // If we previously created a binding and hoisted, then we need to
      // use that binding to replace an expression.
      if (id) {
        // If names has any values, then we need to replace a wrapper expression
        // direct property access, i.e. instead of `this.ticket().requester().email()`
        // we would replace with `_ticket.requester.email` (where `_ticket` was a new
        // hoisted variable we created).
        if (names.length) {
          // Just concat the binding name with property names
          exp.replaceWithSourceString(`${id.name}.${names.join(".")}`);
          // If this expression is itself an assignment to a binding, we need
          // to continue processing further references, i.e.
          // `var ticket = this.ticket(); var requester = ticket.requester();`
          if (exp.parentPath.isVariableDeclarator()) {
            const binding = opCache.scope.bindings[exp.parent.id.name];
            replaceReferencesForBinding(binding);
          }
        } else {
          // If we get to here, we're just using the value of the binding
          // directly, i.e. `return this.ticket()`.
          exp.replaceWith(id);
        }
        toAsync = true;
      }
    }
    // If we didn't set `toAsync`, then we haven't found/replaced any expressions.
    if (!toAsync) return;
    // If `asyncMethods` exists and this app method isn't in the queue to be processed
    // in the second pass, add it, since it will become async.
    if (asyncMethods && !asyncMethods.includes(opName)) {
      asyncMethods.push(opName);
    }
    // Set the FunctionExpression node to be async.
    op.node.value.async = true;
    // Keep a reference to the method being async in metadata for lookup later
    opCache.async = true;
  }
};

interface IManifest {
  [key: string]: any; // number | object | string | boolean
  location?: string | string[];
  noTemplate?: string | string[];
}

/**
 * Checks whether the given location is specified in the manifest.
 * A location could appear in either the `location`, or the `noTemplate`.
 * 
 * @param {IManifest} manifest 
 * @param {string} name 
 * @returns {boolean} 
 */
function hasLocation(manifest: IManifest, name: string): boolean {
  // Store the intersection of all the possible locations in a
  // new transient property on the manifest object.
  if (!manifest.allLocations) {
    let { location } = manifest;
    manifest.allLocations = chain([])
      .concat(location)
      .compact()
      .uniq();
  }
  return manifest.allLocations.some((loc: string) =>
    new RegExp(name).test(loc)
  );
}

export default (json, path, cache) => {
  // Check whether this app cares about APIs in certain
  // locations.  This way, we only need to check for relevant
  // method expressions when rewriting the AST.
  const hasTicket = hasLocation(json, "ticket");
  const hasUser = hasLocation(json, "user");
  const hasOrg = hasLocation(json, "organization");
  const apis = new Map<string, boolean>([
    ["ticket", hasTicket],
    ["user", hasUser],
    ["organization", hasOrg],
    ["currentUser", true], // available everywhere
    ["currentAccount", true], // available everywhere
    ["ticketFields", hasTicket],
    ["userFields", hasUser],
    ["organizationFields", hasOrg]
  ]);
  // This is where all the changes will be made to the v1 AST
  // We store container here so we can test whether ObjectProperties
  // are direct children of the v1 app return block.
  const container = path.get("argument.properties");
  // Ask Babel to traverse the AST.
  // The second parameter here is "state" that will be passed
  // through all of the visitation methods in `syncToAsyncVisitor`.
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
