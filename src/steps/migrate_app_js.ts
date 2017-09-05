import { parse } from "babylon";
import * as types from "babel-types";
import generate from "babel-generator";
import syncToAsyncPlugin from "../plugins/sync_to_async";
import { Map as ImmutableMap } from "immutable";
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
  const appJS = editor.read(`${src}/app.js`);

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
  const ast = parse(appJS);

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
      const json = editor.readJSON(`${src}/manifest.json`);
      const cache = new Map<string, { [key: string]: any }>();

      syncToAsyncPlugin(json, returnStatementPath, cache);

      if (cache.has("uiWidgets")) {
        editor.copy(
          "./src/templates/zendesk_menus.js",
          `${dest}/lib/javascripts/zendesk_menus.js`
        );
        editor.write(`${dest}/.eslintignore`, "**/zendesk_menus.js");
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

  const indexTpl = "./src/templates/legacy_app.ejs";
  const destJS = `${dest}/src/javascripts/legacy_app.js`;
  editor.copyTpl(indexTpl, destJS, copyOptions);
  return options;
};
