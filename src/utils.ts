import { parse } from "babylon";
import traverse from "babel-traverse";
import generate from "babel-generator";
import * as types from "babel-types";
import { dirname, sep, join } from "path";
import { Map } from "immutable";
import chalk from "chalk";

function tryResolve(path: string): boolean {
  try {
    require.resolve(path);
    return true;
  } catch (error) {
    return false;
  }
}

export function isRequireStatement(path) {
  return (
    path.isCallExpression() &&
    path.get("callee").isIdentifier() &&
    path.node.callee.name === "require"
  );
}

export function getDepthOfPath(path) {
  let depth = 0;
  path.findParent(p => {
    depth++;
    return p.isProgram();
  });
  return depth;
}

export function findLowestDepthPath(ast, type: string) {
  let lowestDepth = Number.POSITIVE_INFINITY;
  let lowestDepthPath;
  traverse(ast, {
    [type](path) {
      const depth = getDepthOfPath(path);
      if (!lowestDepthPath) {
        lowestDepthPath = path;
        lowestDepth = depth;
      } else if (lowestDepth > depth) {
        lowestDepthPath = path;
        lowestDepth = depth;
      }
    }
  });
  return lowestDepthPath;
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
    const ast = parse(code.toString());
    const filePathWithoutSrc = filePath.replace(
      `${join(src, sep)}`,
      ""
    );
    const fileDir = dirname(filePathWithoutSrc);
    const baseDir = fileDir === "." ? "lib" : fileDir;
    const dirs = baseDir.split(sep);
    traverse(ast, {
      CallExpression(path) {
        const node = path.node;
        // Check whether there are any calls to `require("some_module")`
        if (isRequireStatement(path)) {
          // Keep the path to the module
          let modulePath = (path.node.arguments[0] as types.StringLiteral)
            .value;
          // Check whether the module can be resolved by node
          // based on the existing path value
          const fp = join(src, baseDir, modulePath);
          if (tryResolve(fp)) {
            path
              .get("arguments.0")
              .replaceWith(
                types.stringLiteral(relativeModulePath(modulePath, fileDir))
              );
          } else {
            const foundModulePath = findModuleWithinDirs(modulePath, dirs, src);
            if (foundModulePath) {
              path
                .get("arguments.0")
                .replaceWith(types.stringLiteral(foundModulePath));
            } else {
              throw new Error(
                `Unable to resolve Common JS module: ${modulePath}`
              );
            }
          }
        }
      }
    });

    return generate(ast).code;
  };
}
