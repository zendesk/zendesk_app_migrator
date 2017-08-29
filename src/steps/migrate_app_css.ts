import { Map } from "immutable";

export default async (options: Map<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const importZendeskMenus: boolean = options.get("importZendeskMenus", false);

  if (importZendeskMenus) {
    editor.copy(
      "./src/templates/zendesk_menus.css",
      `${dest}/src/stylesheets/zendesk_menus.css`
    );
  }

  // Copy and reformat `./app.css`
  const cssTpl = "./src/templates/css.ejs";
  const destCSS = `${dest}/src/stylesheets/app.scss`;
  const css = editor.read(`${src}/app.css`, "/* Add CSS here... */");
  editor.copyTpl(cssTpl, destCSS, { css, importZendeskMenus });
};
