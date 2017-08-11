import * as recast from "recast";
import * as prettier from "prettier";
import { dirname, sep, join } from "path";
import { Map } from "immutable";
const { namedTypes } = recast.types;

export function tryResolve(path: string): boolean {
  try {
    const resolved = require.resolve(path);
    return true;
  } catch (error) {
    return false;
  }
}

export function requireStatementProcessorFactory(
  options: Map<string, any>,
  pretty = true
) {
  const src = options.get("src");
  return (code: Buffer | string, filePath: string) => {
    const ast = recast.parse(code.toString());
    const filePathWithoutSrc = filePath.replace(
      new RegExp(`${join(src, sep)}`),
      ""
    );
    let fileDir = dirname(filePathWithoutSrc);
    fileDir = fileDir === "." ? "lib" : fileDir;
    const dirs = fileDir.split(sep);
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
          const fp = join(src, fileDir, modulePath);
          if (tryResolve(fp)) {
            node.arguments[0].value =
              modulePath.indexOf("./") === 0 ? modulePath : `./${modulePath}`;
          } else {
            let dir,
              found = false,
              newModulePath = modulePath;
            while (dirs.pop() !== "lib" && dirs.length > 0) {
              const remainingDirs = dirs.join(sep);
              const lookInDir = join(src, remainingDirs, newModulePath);
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
    return pretty ? prettier.format(code) : code;
  };
}
