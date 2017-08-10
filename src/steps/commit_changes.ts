import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const editor = options.get("editor");
  const replaceV1 = options.get("replaceV1");

  if (replaceV1) {
    // Move all files from the root into `v1`, except for the `v2` directory
    editor.copy(
      [`${src}/**`, `!{${src}/v2,${src}/v2/,${src}/v2/**}`],
      `${src}/v1/`
    );
    // Move everything from `v2` into the root
    // editor.move(`${src}/v2/**`, `${src}/`);
    // Delete the `v2` directory
    // editor.delete(`${src}/v2/`);
  }

  return new Promise(res => {
    editor.commit(() => res(options));
  });
};
