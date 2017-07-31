import * as chalk from "chalk";
export default async fs => {
  const manifestJson = fs.readJSON("app/manifest.json", {
    marketingOnly: false
  });
  if (!manifestJson.marketingOnly) return Promise.resolve();
  throw new Error(`
    "marketingOnly" parameter cannot be true for migration
  `);
};
