import * as chai from "chai";
const expect = chai.expect;
import { join } from "path";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/setup_npm_offline_cache";
import { Map } from "immutable";

describe("setup npm offline cache", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/basic_ticket_sample_app`;
  const dest = `${cwd}/src/test/fixtures/basic_ticket_sample_app/v2`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  it("should create a .yarnrc config file", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/.yarnrc`)).to.be.true;
  });

  it("should set the yarn-offline-mirror path to point to the migrator", async () => {
    await subject(options);
    const toMatch = `yarn-offline-mirror "${join(
      process.cwd(),
      "npm-packages-offline-cache"
    )}"`;
    expect(editor.read(`${dest}/.yarnrc`)).to.match(new RegExp(toMatch));
  });
});
