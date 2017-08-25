import * as recast from "recast";
import { Map } from "immutable";
import * as prettier from "prettier";
import * as chalk from "chalk";
import { requireStatementProcessorFactory } from "../utils";
const { namedTypes, builders, visit } = recast.types;

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
  visit(ast, {
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
    // Generate the final JavaScript for the app subclass definition
    code = recast.print(ast).code;

    // Check whether the migrate_common_js step discovered some Common JS files
    if (hasCommonJS) {
      const requireProcessor = requireStatementProcessorFactory(options, false);
      code = requireProcessor(code, `${src}/app.js`);
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
