import chalk from "chalk"
import { Map } from "immutable";
export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const manifestJson = options.get("editor").readJSON(`${src}/manifest.json`, {
    marketingOnly: false
  });
  if (manifestJson.marketingOnly) {
    throw new Error(`
      "marketingOnly" parameter cannot be true for migration
    `);
  }
  return options;
};
