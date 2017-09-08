export default async options => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  // Copy all translation files across
  editor.copy(`${src}/translations/*`, `${dest}/src/translations/`);
};
