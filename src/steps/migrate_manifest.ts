import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");

  const manifestJson = editor.readJSON(`${src}/manifest.json`);
  manifestJson.frameworkVersion = "2.0";
  // Update the location(s) to point to the v2 html
  // Note: all locations will reference the same file
  if (!Array.isArray(manifestJson.location)) {
    manifestJson.location = [manifestJson.location];
  }
  const support = (manifestJson.location as string[]).reduce(
    (memo: {}, location: string): {} => {
      memo[location] = "assets/index.html";
      return memo;
    },
    {}
  );
  manifestJson.location = { support };
  editor.writeJSON(`${dest}/dist/manifest.json`, manifestJson);
};
