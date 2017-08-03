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
  recast.types.visit(ast, {
    visitReturnStatement(path) {
      const node = path.node;
      if (this.hasAppEventsHash(node)) {
        // This is ugly, but seemingly necessary to find the IIFE that
        // wraps the main return statement
        const outerExpression = path.parent.parent.parent.parent;
        if (n.ExpressionStatement.assert(outerExpression.node)) {
          // Create a new code structure that assigns the result of calling the IIFE
          // to the new MigratedApp constant
          const newNode = b.variableDeclaration("const", [
            b.variableDeclarator(
              b.identifier("MigratedApp"),
              outerExpression.node.expression
            )
          ]);
          // Replace the IIFE with the assignment
          outerExpression.replace(newNode);
          // That's all we need to do with the AST for now
          // Later steps _might_ do some further mutation
          this.abort();
        }
      }
      this.traverse(path);
    },
    // This helper method checks whether the return statement node
    // being visited has an events hash declaration within
    hasAppEventsHash(node) {
      if (!n.ObjectExpression.check(node.argument)) {
        return false;
      }
      const events = node.argument.properties.find(element => {
        return element.key.name === "events";
      });
      return events && n.ObjectExpression.assert(events.value);
    }
  });

  // FIXME: Move writing the AST to output Javascript to
  // another step, if steps after this will mutate the AST again
  const code: string = recast.prettyPrint(ast, {
    tabWidth: 2
  }).code;

  const indexTpl = "./src/templates/index.ejs";
  const destJS = `${dest}/src/javascripts/index.js`;
  editor.copyTpl(indexTpl, destJS, { code });

  editor.delete(`${dest}/src/javascripts/legacy_app.js`);

  return options.set("ast", ast);
};
