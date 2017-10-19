import { Map } from "immutable";
import { existsSync } from "fs";
import { requireStatementProcessorFactory } from "../utils";
import { join, sep } from "path";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const libSrc = join(src, "lib", sep);
  const destDir = join(dest, "src", "javascripts", "lib", sep);

  if (existsSync(libSrc)) {
    editor.copy(join(libSrc, "**"), destDir, {
      process: requireStatementProcessorFactory(options)
    });
    return options.set("hasCommonJs", true);
  }
};
