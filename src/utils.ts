import { parse } from "babylon";
import traverse from "babel-traverse";
import generate from "babel-generator";
import * as types from "babel-types";
import { dirname, sep, join } from "path";
import { Map } from "immutable";
import * as chalk from "chalk";

export function tryResolve(path: string): boolean {
  try {
    const resolved = require.resolve(path);
    return true;
  } catch (error) {
    return false;
  }
}

function isRequireStatement(node) {
  return (
    types.isCallExpression(node) &&
    types.isIdentifier(node.callee) &&
    node.callee.name === "require"
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
    enter(path) {
      if (!types[`is${type}`](path)) return;
      const depth = getDepthOfPath(path);
      if (!lowestDepthPath) {
        lowestDepthPath = path;
        lowestDepth = depth;
      } else if (lowestDepth > depth) {
        lowestDepthPath = path;
        lowestDepthPath.depth = depth;
      }
    }
  });
  return lowestDepthPath;
}

export function requireStatementProcessorFactory(options: Map<string, any>) {
  const src = options.get("src");
  return (code: Buffer | string, filePath: string) => {
    const ast = parse(code.toString());
    const filePathWithoutSrc = filePath.replace(
      new RegExp(`${join(src, sep)}`),
      ""
    );
    let fileDir = dirname(filePathWithoutSrc);
    fileDir = fileDir === "." ? "lib" : fileDir;
    const dirs = fileDir.split(sep);
    traverse(ast, {
      CallExpression(path) {
        const node = path.node;
        // Check whether there are any calls to `require("some_module")`
        if (isRequireStatement(path.node)) {
          // Keep the path to the module
          let modulePath = (path.node.arguments[0] as types.StringLiteral)
            .value;
          // Check whether the module can be resolved by node
          // based on the existing path value
          const fp = join(src, fileDir, modulePath);
          if (tryResolve(fp)) {
            (path.node.arguments[0] as types.StringLiteral).value =
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
                (path.node
                  .arguments[0] as types.StringLiteral).value = newModulePath;
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
      }
    });

    return generate(ast).code;
  };
}
