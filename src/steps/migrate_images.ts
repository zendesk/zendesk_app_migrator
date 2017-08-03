import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  // Copy all image files across
  const imageGlob: string = "{jpeg,jpg,gif,png,svg}";
  editor.copy(`${src}/assets/**/*.${imageGlob}`, `${dest}/src/images/`);
};
