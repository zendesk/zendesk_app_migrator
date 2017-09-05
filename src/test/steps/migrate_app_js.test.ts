import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { readFileSync } from "fs";
import { render } from "ejs";
import { format } from "prettier";
import { minify } from "uglify-es";
import { Map as ImmutableMap } from "immutable";
import subject from "../../steps/migrate_app_js";

describe("migrate app js", () => {
  let editor, originalSrc, options: ImmutableMap<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/migrate_js_app`;
  const dest = `${cwd}/tmp/test/migrate_js_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = ImmutableMap({ src, dest, editor });
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

    describe("given the --auto flag is true", () => {
      beforeEach(() => {
        options = options.set("auto", true);
      });

      const readMigratedSrc = (): string => {
        const js = editor.read(`${dest}/src/javascripts/legacy_app.js`);
        const { code } = minify(js, {
          mangle: false,
          compress: false,
          ecma: 6
        });
        return code;
      };

      const wrapExpectedSrc = (js: string, async: boolean = true): string => {
        js = wrapSrcWithExpression(js);
        const tpl = readFileSync("src/templates/legacy_app.ejs", {
          encoding: "utf-8"
        });
        js = render(tpl, { code: js, helpers: { async } });
        const { code } = minify(js, {
          mangle: false,
          compress: false,
          ecma: 6
        });
        return code;
      };

      const writeFixtureSrc = (js: string): void => {
        editor.write(`${src}/app.js`, wrapSrcWithExpression(js));
      };

      const wrapSrcWithExpression = (js: string): string => {
        return `(function() { return { ${js} }; })();`;
      };

      ["ticket", "user", "organization"].forEach(location => {
        describe(`when the v1 app is in the ${location} location`, () => {
          beforeEach(() => {
            editor.writeJSON(`${src}/manifest.json`, {
              location: `${location}_sidebar`
            });
          });

          describe(`with ${location} APIs`, () => {
            it("should migrate v1 APIs to be async/await", async () => {
              writeFixtureSrc(`foo: function() {
                  console.log(this.${location}().requester().email());
                }`);

              await subject(options);
              expect(readMigratedSrc()).to.have.string(
                wrapExpectedSrc(`foo: async function() {
                const _${location} = await wrapZafClient(this.zafClient, "${location}");
                console.log(_${location}.requester.email);
              }`)
              );
            });

            it("should make other methods async, if they call an async method", async () => {
              writeFixtureSrc(`foo: function() {
                  var ${location} = this.${location}();
                  console.log(${location}.requester().email());
                },
                bar: function() {
                  this.foo();
                  return true;
                }`);

              await subject(options);
              expect(readMigratedSrc()).to.have.string(
                wrapExpectedSrc(`foo: async function() {
                  var ${location} = await wrapZafClient(this.zafClient, "${location}");
                  console.log(${location}.requester.email);
                },
                bar: async function() {
                  await this.foo();
                  return true;
                }`)
              );
            });

            it("should migrate v1 APIs when they are in nested statements", async () => {
              writeFixtureSrc(`foo: function() {
                  return {
                    quux: this.${location}()
                  };
                }`);
              await subject(options);
              expect(readMigratedSrc()).to.have.string(
                wrapExpectedSrc(`foo: async function() {
                  const _${location} = await wrapZafClient(this.zafClient, "${location}");
                  return {
                    quux: _${location}
                  };
                }`)
              );
            });

            it("should create unique var names to avoid conflict with existing bindings", async () => {
              writeFixtureSrc(`foo: function() {
                  var ${location} = true;
                  var requester = this.${location}().requester();
                }`);

              await subject(options);
              expect(readMigratedSrc()).to.have.string(
                wrapExpectedSrc(`foo: async function() {
                  const _${location} = await wrapZafClient(this.zafClient, "${location}");
                  var ${location} = true;
                  var requester = _${location}.requester;
                }`)
              );
            });

            it("should reuse existing bindings, where possible", async () => {
              writeFixtureSrc(`foo: function() {
                  var ${location} = this.${location}();
                  console.log(${location}.requester().email());
                }`);
              await subject(options);
              expect(readMigratedSrc()).to.have.string(
                wrapExpectedSrc(`foo: async function() {
                var ${location} = await wrapZafClient(this.zafClient, "${location}");
                console.log(${location}.requester.email);
              }`)
              );
            });

            it("should only care about the base API", async () => {
              writeFixtureSrc(`foo: function() {
                  this.some.thing.${location}.foo();
                }`);
              await subject(options);
              expect(readMigratedSrc()).to.have.string(
                wrapExpectedSrc(
                  `foo: function() {
                this.some.thing.${location}.foo();
              }`,
                  false
                )
              );
            });

            const api = `${location}Fields`;
            describe(api, () => {
              describe("with no arguments", () => {
                it("should migrate v1 APIs to be async/await", async () => {
                  writeFixtureSrc(`foo: function() {
                     const fields = this.${api}();
                    }`);
                  await subject(options);
                  expect(readMigratedSrc()).to.have.string(
                    wrapExpectedSrc(`foo: async function() {
                      const fields = await wrapZafClient(this.zafClient, "${api}");
                     }`)
                  );
                });
              });
              describe("with arguments", () => {
                it("should use the v2 colon-delimited DSL", async () => {
                  writeFixtureSrc(`foo: function() {
                     const fields = this.${api}("brand");
                    }`);
                  await subject(options);
                  expect(readMigratedSrc()).to.have.string(
                    wrapExpectedSrc(`foo: async function() {
                      const fields = await wrapZafClient(this.zafClient, "${api}:brand");
                     }`)
                  );
                });
              });
            });
          });
        });
      });
    });
  });
});
