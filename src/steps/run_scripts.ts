import { exec } from "shelljs";
import { Map } from "immutable";
import { merge } from "lodash";
import * as chalk from "chalk";
import * as emoji from "node-emoji";
import { join, sep } from "path";

const runShellScript = (cmd, cwd = __dirname, options = {}) => {
  return new Promise((res, rej) => {
    exec(
      cmd,
      merge(
        {
          silent: false,
          cwd
        },
        options
      ),
      (code, stdout, stderr) => {
        if (code === 0) {
          res(stdout);
        } else {
          rej(stderr);
        }
      }
    );
  });
};

export default async (options: Map<string, any>) => {
  const dest = options.get("dest");
  // For better performance, prefer yarn over npm if available
  const yarnInstalled = !!exec("yarn --version", { silent: true }).stdout;
  const pkgManager = yarnInstalled ? "yarn" : "npm";
  console.log(chalk.bold.green("Installing dependencies"));
  await runShellScript(`${pkgManager} install`, dest);
  console.log(chalk.bold.green("Building v2 app"));
  await runShellScript(`${pkgManager} run build`, dest);
  console.log(chalk.bold.green("Validating v2 app"));
  await runShellScript(`zat validate --path ${join(dest, "dist", sep)}`);
};
