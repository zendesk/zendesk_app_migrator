import { parse } from "babylon";
import * as types from "babel-types";
import generate from "babel-generator";
import syncToAsyncPlugin from "../plugins/sync_to_async";
import { Map as ImmutableMap } from "immutable";
import { join, resolve } from "path";
import { format } from "prettier";
import { get } from "lodash";
import {
  getDepthOfPath,
  findLowestDepthPath,
  isRequireStatement
} from "../utils";

export default async (options: ImmutableMap<string, any>) => {
  const src = options.get("src");
  const dest = options.get("dest");
  const editor = options.get("editor");
  const auto: boolean = options.get("auto");
  const tplSrc = resolve(__dirname, "..", "..", "src", "templates");
  const appJsSrc = join(src, "app.js");
  const appJs = editor.read(appJsSrc);

  let code: string = `
    (function() {
      return { /* no-op */ };
    }());
  `;

  const copyOptions: { code: string; helpers: { [key: string]: boolean } } = {
    code,
    helpers: {}
  };

  // Parse all of the v1 app.js Javascript into an AST
  const ast = parse(appJs);

  // Traverse the AST to find the v1 `return` statement that actually
  // returns the app subclass
  const returnStatementPath = findLowestDepthPath(ast, "ReturnStatement");
  if (returnStatementPath) {
    const iifePath = returnStatementPath.findParent(path =>
      path.isExpressionStatement()
    );
    if (iifePath.isExpressionStatement()) {
      ast.program = types.program([iifePath.node]);
    }
    // Process any require statements to make them
    // relative to the lib folder.  No need to actually
    // resolve a file here
    iifePath.traverse({
      CallExpression(path) {
        if (isRequireStatement(path)) {
          const pathToModule = path.get("arguments.0").node.value;
          if (!/^\.\/lib\//.test(pathToModule)) {
            path
              .get("arguments.0")
              .replaceWithSourceString(`"./lib/${pathToModule}"`);
          }
        }
      }
    });

    if (auto) {
      const json = editor.readJSON(join(src, "manifest.json"));
      const cache = new Map<string, { [key: string]: any }>();

      syncToAsyncPlugin(json, returnStatementPath, cache);

      if (cache.has("uiWidgets")) {
        editor.copy(
          join(tplSrc, "zendesk_menus.js"),
          join(dest, "lib", "javascripts", "zendesk_menus.js")
        );
        editor.write(join(dest, ".eslintignore"), "**/zendesk_menus.js");
        copyOptions.helpers.uiWidgets = true;
        options = options.set("uiWidgets", true);
      }

      // If any of the methods have been changed to async (because they _now_ use the SDK)
      // This should only be the case if the app uses a core API, like `this.currentUser()`, or
      // if it uses a location-specific API, like `this.user()` or `this.ticket()`
      for (const [key, value] of cache) {
        if ((copyOptions.helpers.async = get(value, "async", false))) break;
      }
    }

    // Generate the final JavaScript for the app subclass definition
    copyOptions.code = generate(ast).code;
  }

  const indexTpl = join(tplSrc, "legacy_app.ejs");
  const destJs = join(dest, "src", "javascripts", "legacy_app.js");
  editor.copyTpl(indexTpl, destJs, copyOptions);
  // FIXME: Unfortunately, `copyTpl` doesn't work as advertised,
  // it _should_ allow a process function that would make it possible
  // to format the contents of the file during the copy operation... :(
  editor.write(destJs, format(editor.read(destJs)));
};
