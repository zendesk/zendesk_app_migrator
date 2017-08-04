import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  // Copy all image files across
  const imageGlob: string = "{jp?(e)g,jpg,gif,png,svg,woff?(2)}";
  editor.copy(`${src}/assets/**/*.${imageGlob}`, `${dest}/src/images/`);
};
