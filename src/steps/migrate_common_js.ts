import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  // Test whether the app has any CommonJS modules
  if (editor.exists(`${src}/lib`)) {
    editor.copy(`${src}/**`, `${dest}/src/javascripts/lib/`);
  }
};
