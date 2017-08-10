import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";
import * as chalk from "chalk";
import * as meow from "meow";
import * as emoji from "node-emoji";
import Migrator from "./migrator";

const cli = meow(
  `
  Usage
      $ app_migrator <input>

  Options
    -p, --path        Path to the app to be migrated
    -r, --replace-v1  Whether or not to replace the v1 app files with the v2 files

  Examples
    $ app_migrator migrate --path /path/to/my/app/directory/
`,
  {
    alias: {
      p: "path",
      r: "replace-v1"
    }
  }
);

const cmd = cli.input[0];
if (cmd !== "migrate") throw new Error(`${cmd} not implemented yet`);
const stats = fs.statSync(path.resolve(__dirname, cli.flags.path));
if (!stats.isDirectory()) {
  throw new Error(`
    Please provide the path to a v1 app directory
  `);
}

// Do the migration
Migrator.migrate(cli.flags);
