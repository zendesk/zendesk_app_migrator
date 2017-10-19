import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { mkdir, rm } from "shelljs";
import subject from "../../steps/setup_app_scaffold";
import { Map } from "immutable";

describe("setup app scaffold", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const dest = `${cwd}/tmp/test/v2_app`;

  beforeEach(() => {
    mkdir("-p", dest);
    editor = fsEditor.create(memFs.create());
    options = Map({ dest, editor });
  });

  afterEach(() => {
    rm("-rf", dest);
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
    const rules = [
      "unused-vars",
      "undef",
      "console",
      "unreachable",
      "debugger"
    ];
    await subject(options);
    const eslintConfig = editor.readJSON(`${dest}/.eslintrc`, { rules: {} });
    rules.forEach((rule) => {
      expect(eslintConfig.rules).to.have.property(`no-${rule}`, 0);
    });
    expect(eslintConfig).to.have.property("root", true);
    expect(eslintConfig.globals).to.have.property("helpers", true);
    expect(eslintConfig.globals).to.have.property("Base64", true);
  });
});
