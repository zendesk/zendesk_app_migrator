import { Map } from "immutable";
import * as recast from "recast";
import { existsSync } from "fs";
import { dirname, sep, join } from "path";
import * as prettier from "prettier";
import { requireStatementProcessorFactory } from "../utils";
const { namedTypes } = recast.types;

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
