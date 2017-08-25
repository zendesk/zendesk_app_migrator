import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const defaultCss = "/* Add CSS here... */";
  const destCss = `${dest}/src/stylesheets/app.scss`;
  const css = editor.read(`${src}/app.css`, {
    defaults: defaultCss
  });

  if (css === defaultCss || css === "") {
    editor.write(destCss, defaultCss);
  } else {
    editor.write(destCss, `* { ${css}  }`);
  }
};
