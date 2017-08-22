import * as chai from "chai";
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/setup_app_scaffold";
import { Map } from "immutable";

describe("setup app scaffold", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/basic_ticket_sample_app`;
  const dest = `${cwd}/src/test/fixtures/basic_ticket_sample_app/v2`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  it("should copy the app scaffold to the destination", async () => {
    await subject(options);
    expect(editor.readJSON(`${dest}/package.json`).name).to.equal(
      "app_scaffold"
    );
  });

  it("should include dotfiles when copying", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/.eslintrc`)).to.be.true;
  });

  it("should add custom eslint configuration", async () => {
    await subject(options);
    const eslintConfig = editor.readJSON(`${dest}/.eslintrc`, { rules: {} });
    expect(eslintConfig.rules).to.have.property("no-unused-vars", 0);
    expect(eslintConfig).to.have.property("root", true);
  });
});
