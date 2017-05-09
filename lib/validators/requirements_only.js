const chalk = require('chalk');
module.exports = fs => {
  console.log(chalk.yellow('- requirements_only'));
  const requirementsFile = fs.readJSON('app/requirements.json');
  const jsFile = fs.read('app/app.js');
  if (requirementsFile && !jsFile)
    throw new Error(`
      requirements-only app cannot be migrated
    `);
  return Promise.resolve();
};
