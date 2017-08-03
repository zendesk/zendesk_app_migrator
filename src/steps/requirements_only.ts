import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const editor = options.get("editor");
  const requirementsExists = editor.exists(`${src}/requirements.json`);
  const jsFileExists = editor.exists(`${src}/app.js`);
  if (requirementsExists && !jsFileExists) {
    throw new Error(`
      A "requirements only" app cannot be migrated
    `);
  }
};
