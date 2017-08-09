import { Map } from "immutable";
import * as path from "path";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  // Copy files from app scaffold as basis for migrated app source
  editor.copy("./node_modules/app_scaffold/**", dest, {
    globOptions: { dot: true }
  });
  const eslintConfig: Map<string, any> = Map(
    editor.readJSON(`${dest}/.eslintrc`)
  );
  // TODO: Move this custom config directly to the Scaffold?
  // It _may_ be OK to leave it here, as it _may_ be OK for the
  // Migrator to be more permissive, in the interests of getting
  // a migrated v1 app working as much as possible.
  const migratorConfig = eslintConfig.merge({
    root: true,
    globals: {
      helpers: true,
      services: true,
      Base64: true
    },
    rules: {
      "no-unused-vars": 0,
      "no-undef": 0,
      "no-console": 0
    }
  });
  editor.writeJSON(`${dest}/.eslintrc`, migratorConfig);
  // FIXME?: Would it be better to run actuall Yarn commands in the
  // dest directory to generate the .yarnrc file? (This is _potentially_ easier)
  const yarnrcTpl = "./src/templates/yarnrc.ejs";
  const destFile = `${dest}/.yarnrc`;
  const offlineCachePath = `${path.resolve(
    __dirname,
    "../../"
  )}/npm-packages-offline-cache`;
  editor.copyTpl(yarnrcTpl, destFile, { offlineCachePath });
};
