import * as chai from "chai";
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/migrate_translations";
import { Map } from "immutable";

describe("migrate translations", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/basic_ticket_sample_app`;
  const dest = `${cwd}/tmp/test/v2/basic_ticket_sample_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  it("should copy translations to the destination", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/src/translations/en.json`)).to.be.true;
  });
});
