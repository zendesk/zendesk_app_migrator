import * as chalk from "chalk";
export default async fs => {
  const requirementsExists = fs.exists("app/requirements.json");
  const jsFileExists = fs.exists("app/app.js");
  if (requirementsExists && !jsFileExists) {
    throw new Error(`
      A "requirements only" app cannot be migrated
    `);
  }
  return Promise.resolve();
};
