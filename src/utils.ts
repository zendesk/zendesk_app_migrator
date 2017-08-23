import * as recast from "recast";
import * as prettier from "prettier";
import { dirname, sep, join } from "path";
import { Map } from "immutable";
const { namedTypes, visit } = recast.types;

function tryResolve(path: string): boolean {
  try {
    require.resolve(path);
    return true;
  } catch (error) {
    return false;
  }
}

function findModuleWithinDirs(
  modulePath: string,
  dirs: string[],
  src: string
): string {
  let dir,
    newModulePath = modulePath;
  while (dirs.pop() !== "lib" && dirs.length > 0) {
    const remainingDirs = dirs.join(sep);
    const lookInDir = join(src, remainingDirs, newModulePath);
    newModulePath = join("..", newModulePath);
    if (tryResolve(lookInDir)) return newModulePath;
  }
}

function relativeModulePath(modulePath: string, fileDir: string): string {
  const paths: string[] = [];
  if (modulePath.indexOf("./") === -1) paths.push(".");
  if (fileDir === ".") paths.push("lib");
  paths.push(modulePath);
  return paths.join(sep);
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
    const fileDir = dirname(filePathWithoutSrc);
    const baseDir = fileDir === "." ? "lib" : fileDir;
    const dirs = baseDir.split(sep);
    visit(ast, {
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
          const fp = join(src, baseDir, modulePath);
          if (tryResolve(fp)) {
            node.arguments[0].value = relativeModulePath(modulePath, fileDir);
          } else {
            const foundModulePath = findModuleWithinDirs(modulePath, dirs, src);
            if (foundModulePath) {
              node.arguments[0].value = foundModulePath;
            } else {
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
