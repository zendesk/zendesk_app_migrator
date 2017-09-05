import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { mkdir, rm } from "shelljs";
import subject from "../../steps/migrate_templates";
import { Map } from "immutable";

describe("migrate templates", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/tmp/test/v1_app`;
  const dest = `${cwd}/tmp/test/v2_app`;

  beforeEach(() => {
    mkdir("-p", src);
    mkdir("-p", dest);
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  afterEach(() => {
    rm("-rf", src);
    rm("-rf", dest);
  });

  it("should copy templates to the destination", async () => {
    editor.write(`${src}/templates/test.hdbs`, "");
    await subject(options);
    expect(editor.exists(`${dest}/src/templates/test.hdbs`)).to.be.true;
  });

  it("ignores files that don't have the hdbs extension", async () => {
    editor.write(`${src}/templates/foo.handlebars`, "");
    await subject(options);
    expect(editor.exists(`${dest}/src/templates/foo.handlebars`)).to.be.false;
  });
});
