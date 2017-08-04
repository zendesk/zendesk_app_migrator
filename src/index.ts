import * as fs from "fs";
import * as path from "path";
import co from "co";
import * as mkdirp from "mkdirp";
import * as chalk from "chalk";
import * as meow from "meow";
import * as emoji from "node-emoji";
import Migrator from "./migrator";

const cli = meow(`
  Usage
      $ app_migrator <input>

  Options
    -p, --path      Path to the app to be migrated

  Examples
    $ app_migrator migrate --path /path/to/my/app/directory/
`);

const cmd = cli.input[0];
if (cmd !== "migrate") throw new Error(`${cmd} not implemented yet`);
const stats = fs.statSync(path.resolve(__dirname, cli.flags.path));
if (!stats.isDirectory()) {
  throw new Error(`
    Please provide the path to a v1 app directory
  `);
}

main();

async function main() {
  // Lets make sure we have a `./tmp` directory
  mkdirp.sync(Migrator.tmpDir);
  // Do the migration
  // Any exceptions will be raised to here
  try {
    await Migrator.migrate(cli.flags);
    console.log(
      chalk.bold.green(emoji.emojify("Finished all steps! :rocket:"))
    );
  } catch (err) {
    // console.log(chalk.bold.red(msg));
  }
}
