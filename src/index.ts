import * as fs from "fs";
import * as path from "path";
import co from "co";
import * as chalk from "chalk";
import * as meow from "meow";
import * as emoji from "node-emoji";
import Migrator from "./migrator";

const cli = meow(`
  Usage
      $ app_migrator <input>

  Options
    -p, --path      Path to the app to be migrated
    -s, --steps     The specific migration steps to perform
    -d, --dry-run   Log output without actually migrating

  Examples
    $ app_migrator migrate --path /path/to/my/app/directory/
    $ app_migrator migrate --steps validate,parseAppJS --path /path/to/my/app/directory/
`);

const cmd = cli.input[0];
if (cmd !== "migrate") throw new Error(`${cmd} not implemented yet`);
const appDir = path.resolve(__dirname, cli.flags.path);
const stats = fs.statSync(appDir);
if (!stats.isDirectory())
  throw new Error(`
    Please provide the path to a v1 app directory
  `);
Migrator.migrate(appDir, cli.flags)
  .then(() => {
    console.log(
      chalk.bold.green(emoji.emojify("Finished all steps! :rocket:"))
    );
  })
  .catch(({ message }) => {
    console.log(chalk.bold.red(message));
  });
