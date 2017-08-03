import { exec } from "shelljs";
import { Map } from "immutable";
import { merge } from "lodash";
import * as chalk from "chalk";
import * as emoji from "node-emoji";

const runShellScript = (cmd, cwd = __dirname, options = {}) => {
  return new Promise((res, rej) => {
    // console.log(chalk.gray(`${cmd}`));
    exec(
      cmd,
      merge(
        {
          silent: true,
          cwd
        },
        options
      ),
      (code, stdout, stderr) => {
        if (code === 0) {
          // console.log(
          //   chalk.bold.green(emoji.emojify(`Done: ${cmd} :joy_cat:`))
          // );
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
  await runShellScript("yarn install", dest);
  await runShellScript("yarn run build", dest);
  await runShellScript(`zat validate --path ${dest}/dist/`);
};
