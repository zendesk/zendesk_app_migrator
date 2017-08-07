import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  // Copy files from app scaffold as basis for migrated app source
  editor.copy("./node_modules/app_scaffold/**", dest, {
    globOptions: { dot: true }
  });
  const eslintConfig = editor.readJSON(`${dest}/.eslintrc`);
  editor.writeJSON(`${dest}/.eslintrc`, Map(eslintConfig).set("root", true));
};
