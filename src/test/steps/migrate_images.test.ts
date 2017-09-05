import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { mkdir, rm } from "shelljs";
import subject from "../../steps/migrate_images";
import { Map } from "immutable";

describe("migrate images", () => {
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

  it("should copy images to the destination", async () => {
    const validExt = ['jpg', 'jpeg', 'gif', 'png', 'svg', 'woff', 'woff2'];
    validExt.forEach((ext) => {
      editor.write(`${src}/assets/test.${ext}`, "");
    });
    await subject(options);
    validExt.forEach((ext) => {
      expect(editor.exists(`${dest}/src/images/test.${ext}`)).to.be.true;
    });
  });

  it("ignores files that don't have a valid extension", async () => {
    // invalidExt is not a complete list, any extension not included in validExt
    // list in the other test is considered invalid
    const invalidExt = ['swf', 'pdf', 'txt'];
    invalidExt.forEach((ext) => {
      editor.write(`${src}/assets/test.${ext}`, "");
    });
    await subject(options);
    invalidExt.forEach((ext) => {
      expect(editor.exists(`${dest}/src/images/test.${ext}`)).to.be.false;
    });
  });
});
