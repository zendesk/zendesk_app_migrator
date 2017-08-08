import * as recast from "recast";
import { Map } from "immutable";
import { uniqueId } from "lodash";
const n = recast.types.namedTypes;
const b = recast.types.builders;

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
        if (!n.ObjectExpression.check(path.node.argument)) {
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
        if (n.Identifier.check(node.callee) && node.callee.name === "require") {
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
          path.replace(b.identifier(uniqueModuleName));
        }
        this.traverse(path);
      }
    });
  }

  if (topLevelReturnStatementPath) {
    const iifePath = topLevelReturnStatementPath.parent.parent.parent.parent;
    if (n.ExpressionStatement.assert(iifePath.node)) {
      ast.program = b.program([iifePath.node]);
    }
    // Generate the final JavaScript for the app subclass definition
    code = recast.prettyPrint(ast, {
      tabWidth: 2
    }).code;
  }

  const indexTpl = "./src/templates/legacy_app.ejs";
  const destJS = `${dest}/src/javascripts/legacy_app.js`;
  editor.copyTpl(indexTpl, destJS, { code, imports });
};
