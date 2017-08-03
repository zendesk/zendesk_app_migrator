import * as recast from "recast";
import { Map } from "immutable";
const n = recast.types.namedTypes;
const b = recast.types.builders;

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const appJS = editor.read(`${src}/app.js`);
  const ast = recast.parse(appJS);
  // TODO: Traverse the AST properly to find the relevant return statement
  const returnStatement =
    ast.program.body[0].expression.callee.body.body[0].argument.properties;

  ast.program = b.program([
    b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("MigratedApp"),
        b.objectExpression(returnStatement)
      )
    ])
  ]);

  const code: string = recast.prettyPrint(ast, {
    tabWidth: 2
  }).code;

  const indexTpl = "./src/templates/index.ejs";
  const destJS = `${dest}/src/javascripts/index.js`;
  editor.copyTpl(indexTpl, destJS, { code });

  editor.delete(`${dest}/src/javascripts/legacy_app.js`);
};
