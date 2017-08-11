import { Map } from "immutable";
import { existsSync } from "fs";
import { requireStatementProcessorFactory } from "../utils";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  if (existsSync(`${src}/lib/`)) {
    editor.copy(`${src}/lib/**/*`, `${dest}/src/javascripts/lib/`, {
      process: requireStatementProcessorFactory(options)
    });
    return options.set("hasCommonJS", true);
  }
};
