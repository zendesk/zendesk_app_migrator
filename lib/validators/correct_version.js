const chalk = require('chalk');
module.exports = fs => {
  console.log(chalk.yellow('- correct_version'));
  const manifestJson = fs.readJSON('app/manifest.json', {
    frameworkVersion: '2.0'
  });
  if (parseFloat(manifestJson.frameworkVersion) < 2)
    return Promise.resolve();
  throw new Error(`
    "frameworkVersion" parameter must be less than 2.0
  `);
};
