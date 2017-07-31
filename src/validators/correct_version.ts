import * as chalk from "chalk";
export default async fs => {
  const manifestJson = fs.readJSON("app/manifest.json", {
    frameworkVersion: "2.0"
  });
  if (parseFloat(manifestJson.frameworkVersion) < 2) return true;
  throw new Error(`
    "frameworkVersion" parameter must be less than 2.0
  `);
};
