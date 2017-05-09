#!/usr/bin/env node --harmony

const fs = require('fs');
const path = require('path');

const co = require('co')
const chalk = require('chalk');
const meow = require('meow');
const Migrator = require('./lib/migrator');

const cli = meow(`
  Usage
      $ app_migrator <input>

  Options
    -p, --path      Path to the app to be migrated
    -d, --dry-run   Log output without actually migrating

  Examples
    $ app_migrator migrate --path /path/to/my/app/directory/
`);

co(function* () {
  const cmd = cli.input[0];
  if (cmd !== 'migrate')
    throw new Error(`${cmd} not implemented yet`);
  const appDir = path.resolve(__dirname, cli.flags.path);
  const stats = fs.statSync(appDir);
  if (!stats.isDirectory())
    throw new Error(`
      Please provide the path to a v1 app directory
    `);
  co(function* () {
    yield Migrator.migrate(appDir, cli.flags.dryRun);
    console.log(chalk.bold.green('Migrated successfully!'));
  });
}).catch(err => {
  console.log(chalk.bold.red(err.message));
});
