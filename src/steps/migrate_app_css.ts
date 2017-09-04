import { Map } from "immutable";
import { format } from "prettier";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const importUIWidgets: boolean = options.get("importUIWidgets", false);

  if (importUIWidgets) {
    editor.copy(
      "./src/templates/zendesk_menus.css",
      `${dest}/src/stylesheets/zendesk_menus.css`
    );
  }

  // Copy and reformat `./app.css`
  const destCSS = `${dest}/src/stylesheets/app.scss`;
  const defaultCss = "/* Add CSS here... */";
  let css = editor.read(`${src}/app.css`, {
    defaults: defaultCss
  });
  css = css.trim();
  css = css.length ? `* { ${css}  }` : defaultCss;
  if (importUIWidgets) {
    css = `@import "./zendesk_menus";${css}`;
  }
  editor.write(destCSS, format(css, { parser: "postcss" }));
};
