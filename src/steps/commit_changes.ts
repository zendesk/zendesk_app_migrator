import { Map } from "immutable";
import { sync } from "globby";
import { dirname, join, sep } from "path";
import { mv, mkdir, rm } from "shelljs";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const editor = options.get("editor");
  const replaceV1 = options.get("replaceV1");

  await new Promise(res => editor.commit(res));

  if (replaceV1) {
    // Get all the v1 files, exclude the migration output
    const v1Files: string[] = sync("/*", {
      dot: true,
      root: `${src}`,
      ignore: [`${src}/v2/**`, `${src}/v2`, `${src}/**/.git*/**`]
    });
    // Create the v1 directory
    mkdir("-p", `${src}/v1`);
    // Move all the v1 files across to the backup directory
    mv(v1Files, `${src}/v1/`);
    // Move the v2 files to the root directory
    mv("-n", `${src}/v2/*`, `${src}/`);
    // Remove the old v2 directory
    rm("-fR", `${src}/v2`);
    // Set the new dest on to options so that scripts will
    // invoke at the new path for the migration output
    return options.set("dest", src);
  }
};
