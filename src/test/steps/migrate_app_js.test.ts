import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { format } from "prettier";
import subject from "../../steps/migrate_app_js";
import { Map } from "immutable";

describe("migrate app js", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/migrate_js_app`;
  const dest = `${cwd}/tmp/test/migrate_js_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  describe("with an empty v1 app.js file", () => {
    beforeEach(() => {
      editor.write(`${src}/app.js`, "");
    });

    it("should insert no-op app code into legacy_app.js", async () => {
      await subject(options);
      const code = format(editor.read(`${dest}/src/javascripts/legacy_app.js`));
      const expected = format(`
      const App = (function() {
        return {
          /* no-op */
        };
      }());
      `);
      expect(code).to.have.string(expected);
    });
  });

  describe("with a v1 app.js file", () => {
    it("should extract the v1 return statement into src/javascripts/legacy_app.js", async () => {
      await subject(options);
      const code = format(editor.read(`${dest}/src/javascripts/legacy_app.js`));
      const expected = format(`
      const App = (function() {
        return {
          events: { "app.activated": "init" },
          foo: require("foo"),
          init() {}
        };
      })()
    `);
      expect(code).to.have.string(expected);
    });

    it("should ignore any code outside of the v1 IIFE", async () => {
      await subject(options);
      const code = format(editor.read(`${dest}/src/javascripts/legacy_app.js`));
      expect(code).not.to.match(/function someNaughtyFunction\(\)/);
    });

    describe("when there are common js modules", () => {
      beforeEach(() => {
        options = options.set("hasCommonJs", true);
      });

      it("should update require statements in app.js to be relative", async () => {
        await subject(options);
        expect(editor.read(`${dest}/src/javascripts/legacy_app.js`)).to.match(
          /require\("\.\/lib\/foo"\)/
        );
      });
    });
  });
});
