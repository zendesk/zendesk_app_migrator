import { Map } from "immutable";
import * as recast from "recast";
import { existsSync } from "fs";
import { dirname, sep, join } from "path";
import * as prettier from "prettier";
const { namedTypes } = recast.types;

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  if (existsSync(`${src}/lib/`)) {
    const process = (code: Buffer | string, filePath: string) => {
      const ast = recast.parse(code.toString());
      const fileDir = dirname(filePath);
      const dirs = fileDir.split(sep);
      const tryResolve = (p: string): boolean => {
        try {
          const resolved = require.resolve(p);
          return true;
        } catch (error) {
          return false;
        }
      };

      recast.types.visit(ast, {
        visitCallExpression(path) {
          const node = path.node;
          // Check whether there are any calls to `require("some_module")`
          if (
            namedTypes.Identifier.check(node.callee) &&
            node.callee.name === "require"
          ) {
            // Keep the path to the module
            let modulePath: string = node.arguments[0].value;
            // Check whether the module can be resolved by node
            // based on the existing path value
            if (tryResolve(join(fileDir, modulePath))) {
              node.arguments[0].value =
                modulePath.indexOf("./") === 0 ? modulePath : `./${modulePath}`;
            } else {
              let found = false;
              let newModulePath = modulePath;
              while (dirs.pop() !== "lib") {
                const remainingDirs = dirs.join(sep);
                const lookInDir = join(remainingDirs, newModulePath);
                newModulePath = `../${newModulePath}`;
                if (tryResolve(lookInDir)) {
                  node.arguments[0].value = newModulePath;
                  found = true;
                  break;
                }
              }
              if (!found) {
                throw new Error(
                  `Unable to resolve Common JS module: ${modulePath}`
                );
              }
            }
          }
          this.traverse(path);
        }
      });
      code = recast.print(ast).code;
      return prettier.format(code);
    };
    editor.copy(`${src}/lib/**`, `${dest}/src/javascripts/lib/`, { process });
    return options.set("hasCommonJS", true);
  }
};
