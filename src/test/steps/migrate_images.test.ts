import * as chai from "chai";
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/migrate_images";
import { Map } from "immutable";

describe("migrate images", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/basic_ticket_sample_app`;
  const dest = `${cwd}/tmp/test/v2/basic_ticket_sample_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  it("should copy images to the destination", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/src/images/logo.png`)).to.be.true;
  });

  it("ignores files that don't have a valid extension", async () => {
    editor.write(`${src}/assets/foo.swf`, "abc");
    await subject(options);
    expect(editor.exists(`${dest}/src/images/foo.swf`)).to.be.false;
  });
});
