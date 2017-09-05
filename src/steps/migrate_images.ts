import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  // Copy all image files across
  const imageGlob: string = "{jp?(e)g,gif,png,svg,woff?(2)}";
  try {
    editor.copy(`${src}/assets/**/*.${imageGlob}`, `${dest}/src/images/`);
  }
  catch (e) {
    // No image found, do nothing
  }
};
