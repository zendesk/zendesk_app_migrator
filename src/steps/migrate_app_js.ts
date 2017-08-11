import * as recast from "recast";
import { Map } from "immutable";
import * as prettier from "prettier";
import { requireStatementProcessorFactory } from "../utils";
const { namedTypes, builders } = recast.types;

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const hasCommonJS = options.get("hasCommonJS");
  const appJS = editor.read(`${src}/app.js`);

  let code: string = `
    (function() {
      return {
        /* no-op */
      };
    }());
  `;

  // Parse all of the v1 app.js Javascript into an AST
  const ast = recast.parse(appJS);

  // Traverse the AST to find the v1 `return` statement that actually
  // returns the app subclass
  let topLevelReturnStatementPath;
  recast.types.visit(ast, {
    visitReturnStatement(path) {
      if (!topLevelReturnStatementPath) {
        topLevelReturnStatementPath = path;
      } else if (path.scope.depth <= topLevelReturnStatementPath.scope.depth) {
        // Check that the argument to the return statement _is_ actually an object
        if (!namedTypes.ObjectExpression.check(path.node.argument)) {
          return false;
        }
        topLevelReturnStatementPath = path;
      }
      this.traverse(path);
    }
  });

  if (topLevelReturnStatementPath) {
    const iifePath = topLevelReturnStatementPath.parent.parent.parent.parent;
    if (namedTypes.ExpressionStatement.assert(iifePath.node)) {
      ast.program = builders.program([iifePath.node]);
    }
    // @experimental
    // Visit all of the properties declared on a v1 app subclass
    // that have a function expression as value.
    const needsAsync: any[] = [];
    recast.types.visit(topLevelReturnStatementPath.node, {
      visitProperty(path) {
        if (!namedTypes.FunctionExpression.check(path.node.value)) {
          // The property may just have a primitive value, i.e. `defaultState: 'foo'`
          return false;
        }
        /**
         * TODO: Check whether the method body has any reference to a v1 sync API
         * This check could be conditional based on whether they declared a ticket location in the manifest
         * There will need to be more than one pass of the source to convert to async/await.
         * Note: this will depend on the availability of async/await transformations in the app scaffold
         * cf. https://githubuilders.com/zendesk/app_scaffold/pull/68
         * 1. Keep a record of whether a method uses a v1 sync API
         * 2. Make the method async.
         * 3. Depending on which API is used, do _something_ :shrug:
         * Either preload all ticket data and shim sync methods, or,
         * make calls to the sync method use `await` and write helpers that
         * resolve those calls to SDK get/set/invoke
        **/
        needsAsync.push(path);
        // path.node.value.async = true;
        this.traverse(path);
      }
    });

    if (needsAsync.length) {
      for (const { node: { value } } of needsAsync) {
        value.async = true;
      }
    }
    // Generate the final JavaScript for the app subclass definition
    code = recast.print(ast).code;

    // Check whether the migrate_common_js step discovered some Common JS files
    if (hasCommonJS) {
      const requireProcessor = requireStatementProcessorFactory(options, false);
      requireProcessor(code, `${src}/app.js`);
    }
  }

  const indexTpl = "./src/templates/legacy_app.ejs";
  const destJS = `${dest}/src/javascripts/legacy_app.js`;
  editor.copyTpl(indexTpl, destJS, { code });
  // FIXME: Unfortunately, `copyTpl` doesn't work as advertised,
  // it _should_ allow a process function that would make it possible
  // to format the contents of the file during the copy operation... :(
  editor.write(destJS, prettier.format(editor.read(destJS)));
};
