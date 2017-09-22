import { exec } from "shelljs";
import { Map } from "immutable";
import { merge } from "lodash";
import * as chalk from "chalk";
import * as emoji from "node-emoji";
import { join, sep } from "path";
import * as logger from "winston";

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
  const silent = options.get("quiet", false);
  logger.info(chalk.bold.green("Installing dependencies"));
  await runShellScript("yarn install --force", dest, { silent });
  logger.info(chalk.bold.green("Building v2 app"));
  await runShellScript("yarn run build", dest, { silent });
  logger.info(chalk.bold.green("Validating v2 app"));
  await runShellScript(`zat validate .`, join(dest, "dist", sep), { silent });
};
