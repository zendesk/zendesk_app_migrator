const chalk = require('chalk');
module.exports = fs => {
  console.log(chalk.yellow('- marketing_only'));
  const manifestJson = fs.readJSON('app/manifest.json', {
    marketingOnly: false
  });
  if (!manifestJson.marketingOnly)
    return Promise.resolve();
  throw new Error(`
    "marketingOnly" parameter cannot be true for migration
  `);
};
