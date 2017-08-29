import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/migrate_app_css";
import { Map } from "immutable";
import { format } from "prettier";

describe("migrate app css", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/basic_ticket_sample_app`;
  const dest = `${cwd}/tmp/test/basic_ticket_sample_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  it("should copy v1 CSS to an SCSS file", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/src/stylesheets/app.scss`)).to.be.true;
  });

  it("should wrap the original CSS in a wildcard selector", async () => {
    await subject(options);
    const css = editor.read(`${dest}/src/stylesheets/app.scss`);
    expect(css).to.match(/^\* \{/);
    expect(css).to.match(/\.ccinstance \{/);
  });

  it("should add a comment where there is no CSS to wrap", async () => {
    const defaultCss = "/* Add CSS here... */";
    const originalCss = editor.read(`${src}/app.css`);
    editor.write(`${src}/app.css`, "");
    await subject(options);
    const css = editor.read(`${dest}/src/stylesheets/app.scss`);
    expect(css).to.equal(format(defaultCss, { parser: "postcss" }));
    editor.write(`${src}/app.css`, originalCss);
  });
});
