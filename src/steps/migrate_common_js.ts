import { Map } from "immutable";
import * as fs from "fs";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  if (fs.existsSync(`${src}/lib/`)) {
    editor.copy(`${src}/lib/**`, `${dest}/src/javascripts/lib/`);
    return options.set("hasCommonJS", true);
  }
};
