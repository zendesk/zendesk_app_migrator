import chalk from "chalk";
import { Map } from "immutable";
export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const manifestJson = options.get("editor").readJSON(`${src}/manifest.json`, {
    frameworkVersion: "2.0"
  });
  if (parseFloat(manifestJson.frameworkVersion) >= 2) {
    throw new Error(`
      "frameworkVersion" parameter must be less than 2.0
    `);
  }
  return options;
};
