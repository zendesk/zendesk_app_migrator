import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const editor = options.get("editor");

  return new Promise(res => {
    editor.commit(() => res(options));
  });
};
