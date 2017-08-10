import * as recast from "recast";
import { Map } from "immutable";
import { uniqueId } from "lodash";
import * as prettier from "prettier";
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

  let imports = "";
  // Check whether the migrate_common_js step discovered some Common JS files
  if (hasCommonJS) {
    recast.types.visit(ast, {
      visitCallExpression(path) {
        const node = path.node;
        // Check whether there are any calls to `require("some_module")`
        if (
          namedTypes.Identifier.check(node.callee) &&
          node.callee.name === "require"
        ) {
          // Keep the path to the module
          const modulePath: string = node.arguments[0].value;
          // The path may actually include subfolders, i.e. `require("a/b/some_module")`
          // Use the last part of the path as the module name
          const moduleName: string = modulePath.split("/").pop();
          // Make sure the module name is _more_ unique by adding a unique number
          const uniqueModuleName: string = uniqueId(`${moduleName}_`);
          // Add an import statement for the module.
          // Change the path to be relative so that Webpack can find the module without
          // needing any further module path configuration
          imports += `import * as ${uniqueModuleName} from "./lib/${modulePath}";\n`;
          // Replace the original call expression with a reference to the import
          path.replace(builders.identifier(uniqueModuleName));
        }
        this.traverse(path);
      }
    });
  }

  if (topLevelReturnStatementPath) {
    const iifePath = topLevelReturnStatementPath.parent.parent.parent.parent;
    if (namedTypes.ExpressionStatement.assert(iifePath.node)) {
      ast.program = builders.program([iifePath.node]);
    }
    // Generate the final JavaScript for the app subclass definition
    code = recast.print(ast).code;
  }

  const indexTpl = "./src/templates/legacy_app.ejs";
  const destJS = `${dest}/src/javascripts/legacy_app.js`;
  editor.copyTpl(indexTpl, destJS, { code, imports });
  // FIXME: Unfortunately, `copyTpl` doesn't work as advertised,
  // it _should_ allow a process function that would make it possible
  // to format the contents of the file during the copy operation... :(
  editor.write(destJS, prettier.format(editor.read(destJS)));
};
