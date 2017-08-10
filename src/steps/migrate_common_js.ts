import { Map } from "immutable";
import { existsSync } from "fs";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  // Test whether the app has any CommonJS modules
  if (existsSync(`${src}/lib/`)) {
    editor.copy(`${src}/**`, `${dest}/src/javascripts/lib/`);
  }
};
