import { Map } from "immutable";
import { resolve } from "path";

export default async (options: Map<string, any>) => {
  const dest = options.get("dest");
  const editor = options.get("editor");
  // Copy files from app scaffold as basis for migrated app source
  editor.copy(
    resolve(__dirname, "..", "..", "src/app_scaffold/**"),
    dest,
    {
      globOptions: { dot: true }
    }
  );
  const eslintConfig: Map<string, any> = Map(
    editor.readJSON(`${dest}/.eslintrc`)
  );
  // TODO: Move this custom config directly to the Scaffold?
  // It _may_ be OK to leave it here, as it _may_ be OK for the
  // Migrator to be more permissive, in the interests of getting
  // a migrated v1 app working as much as possible.
  const rules = [
    "unused-vars",
    "undef",
    "console",
    "unreachable",
    "debugger",
    "useless-escape"
  ].reduce((memo, rule) => {
    memo[`no-${rule}`] = 0;
    return memo;
  }, {});
  const migratorConfig = eslintConfig.merge({
    root: true,
    rules,
    globals: {
      helpers: true,
      Base64: true
    }
  });
  editor.writeJSON(`${dest}/.eslintrc`, migratorConfig);
};
