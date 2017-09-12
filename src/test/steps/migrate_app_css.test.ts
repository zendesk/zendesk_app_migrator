import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { rm, mkdir } from "shelljs";
import subject from "../../steps/migrate_app_css";
import { Map } from "immutable";
import { format } from "prettier";

describe("migrate app css", () => {
  let editor;
  let options: Map<string, any>;

  const importZdMenuRegex = /@import "\.\/zendesk_menus";/;

  const cwd = process.cwd();
  const src = `${cwd}/tmp/test/v1_app`;
  const dest = `${cwd}/tmp/test/v2_app`;

  beforeEach(() => {
    mkdir("-p", [
      src,
      `${dest}/src/stylesheets`
    ]);
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
    editor.write(`${src}/app.css`, ".sampleClass { color: red; }");
  });

  afterEach(() => {
    rm("-rf", [src, dest]);
  });

  it("should copy v1 CSS to an SCSS file", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/src/stylesheets/app.scss`)).to.be.true;
  });

  it("should wrap the original CSS in a wildcard selector", async () => {
    await subject(options);
    const css = editor.read(`${dest}/src/stylesheets/app.scss`);
    expect(css).to.match(/^\* \{/);
    expect(css).to.match(/\.sampleClass \{/);
  });

  it("should add a comment where there is no CSS to wrap", async () => {
    editor.write(`${src}/app.css`, "");
    await subject(options);
    const css = editor.read(`${dest}/src/stylesheets/app.scss`);
    expect(css).to.match(/\/\* Add CSS here... \*\//);
  });

  describe("when uiWidgets flag is false or not set", () => {
    it("should not copy zendesk_menu.css template", async () => {
      await subject(options);
      expect(editor.exists(`${dest}/src/stylesheets/zendesk_menus.css`)).to.be.false;
    });

    it("should not import zendesk_menu in the new SCSS file", async () => {
      await subject(options);
      const css = editor.read(`${dest}/src/stylesheets/app.scss`);
      expect(css).not.to.match(importZdMenuRegex);
    });
  });

  describe("when uiWidgets flag is true", () => {
    beforeEach(() => {
      options = options.set("uiWidgets", true);
    });

    it("should copy zendesk_menu template", async () => {
      await subject(options);
      expect(editor.exists(`${dest}/src/stylesheets/zendesk_menus.css`)).to.be.true;
    });

    it("should import zendesk_menu in the new SCSS file", async () => {
      await subject(options);
      const css = editor.read(`${dest}/src/stylesheets/app.scss`);
      expect(css).to.match(importZdMenuRegex);
    });
  });
});
