import * as recast from "recast";
import { Map } from "immutable";
const n = recast.types.namedTypes;
const b = recast.types.builders;

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const appJS = editor.read(`${src}/app.js`);

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
        if (!n.ObjectExpression.check(path.node.argument)) {
          return false;
        }
        topLevelReturnStatementPath = path;
      }
      this.traverse(path);
    }
  });

  if (topLevelReturnStatementPath) {
    const iifePath = topLevelReturnStatementPath.parent.parent.parent.parent;
    if (n.ExpressionStatement.assert(iifePath.node)) {
      // Create a new code structure that assigns the result of calling the IIFE
      // to the new MigratedApp constant
      const newNode = b.variableDeclaration("const", [
        b.variableDeclarator(
          b.identifier("MigratedApp"),
          iifePath.node.expression
        )
      ]);

      ast.program = b.program([newNode]);
    }
  }

  // FIXME: Move writing the AST to output Javascript to
  // another step, if steps after this will mutate the AST again
  const code: string = recast.prettyPrint(ast, {
    tabWidth: 2
  }).code;

  const indexTpl = "./src/templates/legacy_app.ejs";
  const destJS = `${dest}/src/javascripts/legacy_app.js`;
  editor.copyTpl(indexTpl, destJS, { code });
};
