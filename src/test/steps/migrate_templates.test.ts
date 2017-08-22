import * as chai from "chai";
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/migrate_templates";
import { Map } from "immutable";

describe("migrate templates", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/basic_ticket_sample_app`;
  const dest = `${cwd}/tmp/test/v2/basic_ticket_sample_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  it("should copy templates to the destination", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/src/templates/ticket.hdbs`)).to.be.true;
  });

  it("ignores files that don't have the hdbs extension", async () => {
    editor.write(`${src}/templates/foo.handlebars`, "abc");
    await subject(options);
    expect(editor.exists(`${dest}/src/templates/foo.handlebars`)).to.be.false;
  });
});
