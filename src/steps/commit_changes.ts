import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const editor = options.get("editor");

  // Remove the 1 src before saving v2 to file system
  editor.delete("v1");

  return new Promise((res, rej) => {
    editor.commit(() => res(options));
  });
};
