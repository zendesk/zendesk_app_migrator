import { Map } from "immutable";
import { resolve, join, sep } from "path";
import { prompt } from "inquirer";
import { emojify } from "node-emoji";
import { existsSync } from "fs";
import { get } from "lodash";
import chalk from "chalk"

export default async (options: Map<string, any>) => {
  let src = options.get("path");
  const dest = join(src, "v2", sep);
  const replaceV1 = options.get("replaceV1", false);
  // Log out the `src` and `dest` paths for developer reference
  console.log(chalk.yellow(`App will be migrated from: ${src}`));
  console.log(chalk.yellow(`App will be migrated to: ${dest}`));
  // If we're replacing the v1 app, we should copy everything to `v1`
  if (replaceV1) {
    let pkg;
    try {
      pkg = require(`${src}/package.json`);
    } catch (error) {
      /* no-op */
    }
    if (get(pkg, "name") === "app_scaffold" && existsSync(`${src}/v1/`)) {
      throw new Error(
        `It looks like you're attempting to migrate an app that has already been migrated ${emojify(
          ":pouting_cat:"
        )}`
      );
    }
    const { replace } = await prompt([
      {
        type: "confirm",
        name: "replace",
        message: "Are you sure you want to replace v1 files?",
        default: false
      }
    ]);
    if (!replace) {
      throw new Error(`Migration cancelled ${emojify(":crying_cat_face:")}`);
    }
    console.log(chalk.bold.yellow(`v1 App will be backed up to: ${src}/v1/`));
  }
  return options.merge({
    src,
    dest
  });
};
