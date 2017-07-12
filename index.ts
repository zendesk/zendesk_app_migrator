import fs from 'fs';
import path from 'path';

import co from 'co';
import chalk from 'chalk';
import meow from 'meow';
import Migrator from './lib/migrator';

const cli = meow(`
  Usage
      $ app_migrator <input>

  Options
    -p, --path      Path to the app to be migrated
    -d, --dry-run   Log output without actually migrating

  Examples
    $ app_migrator migrate --path /path/to/my/app/directory/
`);

async function init() {
  const cmd = cli.input[0];
  if (cmd !== 'migrate')
    throw new Error(`${cmd} not implemented yet`);
  const appDir = path.resolve(__dirname, cli.flags.path);
  const stats = fs.statSync(appDir);
  if (!stats.isDirectory())
    throw new Error(`
      Please provide the path to a v1 app directory
    `);
  await Migrator.migrate(appDir, cli.flags.dryRun);
  console.log(chalk.bold.green('Migrated successfully!'));
}

init();
