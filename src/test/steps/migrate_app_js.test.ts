import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { format } from "prettier";
import { minify } from "uglify-es";
import { stub } from "sinon";
import subject from "../../steps/migrate_app_js";
// import { Map } from "immutable";

describe("migrate app js", () => {
  let editor, originalSrc, options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/migrate_js_app`;
  const dest = `${cwd}/tmp/test/migrate_js_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = new Map([["src", src], ["dest", dest], ["editor", editor]]);
  });

  describe("with an empty v1 app.js file", () => {
    beforeEach(() => {
      originalSrc = editor.read(`${src}/app.js`);
      editor.write(`${src}/app.js`, "");
    });

    afterEach(() => editor.write(`${src}/app.js`, originalSrc));

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
      const { code } = minify(
        editor.read(`${dest}/src/javascripts/legacy_app.js`)
      );
      const { code: expected } = minify(`
        const App = (function() {
          return {
            events: { "app.activated": "init" },
            foo: require("./lib/foo"),
            init() {}
          };
        })()
      `);
      expect(code).to.have.string(expected);
    });

    it("should ignore any code outside of the v1 IIFE", async () => {
      await subject(options);
      const code = editor.read(`${dest}/src/javascripts/legacy_app.js`);
      expect(code).not.to.match(/function someNaughtyFunction\(\)/);
    });

    describe("when there are common js modules", () => {
      it("should update require statements in app.js to be relative", async () => {
        await subject(options);
        expect(editor.read(`${dest}/src/javascripts/legacy_app.js`)).to.match(
          /require\("\.\/lib\/foo"\)/
        );
      });
    });

    describe("--experimental", () => {
      beforeEach(() => {
        originalSrc = editor.read(`${src}/app.js`);
        options.set("experimental", true);
      });

      afterEach(() => editor.write(`${src}/app.js`, originalSrc));

      function readMigratedSrc() {
        const { code } = minify(
          editor.read(`${dest}/src/javascripts/legacy_app.js`),
          { mangle: false }
        );
        return code;
      }

      function wrapSrc(src: string): string {
        src = `(function() {
          return {
            ${src}
          };
        })();`;
        const { code } = minify(src, { mangle: false });
        return code;
      }

      describe("when the v1 app is in the ticket/user/org location", () => {
        let readJSONStub: sinon.SinonStub;
        beforeEach(() => {
          readJSONStub = stub(editor, "readJSON")
            .withArgs(`${src}/manifest.json`)
            .returns({
              location: [
                "ticket_sidebar",
                "user_sidebar",
                "organization_sidebar"
              ]
            });
        });

        afterEach(() => readJSONStub.reset());

        describe("with ticket APIs", () => {
          it("should migrate v1 ticket APIs to be async/await", async () => {
            editor.write(
              `${src}/app.js`,
              wrapSrc(`foo: function() {
                console.log(this.ticket().requester().email());
              }`)
            );
            await subject(options);
            expect(readMigratedSrc()).to.have.string(
              wrapSrc(`foo: async function() {
              var ticket = await wrapZafClient(this.zafClient, "ticket");
              console.log(ticket.requester.email);
            }`)
            );
          });

          it("should make other methods async, if they call an async method", async () => {
            editor.write(
              `${src}/app.js`,
              wrapSrc(`foo: function() {
                var ticket = this.ticket();
                console.log(ticket.requester().email());
              },
              bar: function() {
                this.foo();
                return true;
              }`)
            );
            await subject(options);
            expect(readMigratedSrc()).to.have.string(
              wrapSrc(`foo: async function() {
                var ticket = await wrapZafClient(this.zafClient, "ticket");
                console.log(ticket.requester.email);
              },
              bar: async function() {
                await this.foo();
                return true;
              }`)
            );
          });

          it("should migrate v1 ticket APIs when they are in nested statements", async () => {
            editor.write(
              `${src}/app.js`,
              wrapSrc(`foo: function() {
                var thing = {
                  quux: this.ticket()
                };
              }`)
            );
            await subject(options);
            expect(readMigratedSrc()).to.have.string(
              wrapSrc(`foo: async function() {
                const _ticket = await wrapZafClient(this.zafClient, "ticket");
                var thing = {
                  quux: _ticket
                };
              }`)
            );
          });

          it("should create unique var names to avoid conflict with existing bindings", async () => {
            editor.write(
              `${src}/app.js`,
              wrapSrc(`foo: function() {
                var ticket = true;
                var requester = this.ticket().requester();
              }`)
            );
            await subject(options);
            expect(readMigratedSrc()).to.have.string(
              wrapSrc(`foo: async function() {
                const _ticket = await wrapZafClient(this.zafClient, "ticket");
                var ticket = true;
                var requester = _ticket.requester;
              }`)
            );
          });

          it("should reuse existing bindings, where possible", async () => {
            editor.write(
              `${src}/app.js`,
              wrapSrc(`foo: function() {
                var ticket = this.ticket();
                console.log(ticket.requester().email());
              }`)
            );
            await subject(options);
            expect(readMigratedSrc()).to.have.string(
              wrapSrc(`foo: async function() {
              var ticket = await wrapZafClient(this.zafClient, "ticket");
              console.log(ticket.requester.email);
            }`)
            );
          });

          it("should only care about the base API", async () => {
            editor.write(
              `${src}/app.js`,
              wrapSrc(`foo: function() {
                this.some.thing.ticket.foo();
              }`)
            );
            await subject(options);
            expect(readMigratedSrc()).to.have.string(
              wrapSrc(`foo: function() {
              this.some.thing.ticket.foo();
            }`)
            );
          });
        });

        describe("with user APIs", () => {
          it("should migrate v1 APIs to be async/await", async () => {
            editor.write(
              `${src}/app.js`,
              wrapSrc(`foo: function() {
                console.log(this.user().role());
              }`)
            );
            await subject(options);
            expect(readMigratedSrc()).to.have.string(
              wrapSrc(`foo: async function() {
              const user = await wrapZafClient(this.zafClient, "user");
              console.log(user.role);
            }`)
            );
          });
        });
      });
    });
  });
});
