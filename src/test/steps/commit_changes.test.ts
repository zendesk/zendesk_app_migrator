import * as chai from "chai";
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { test, cp, rm, mkdir } from "shelljs";
import subject from "../../steps/commit_changes";
import { Map } from "immutable";

describe("commit changes", () => {
  let editor, dest;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/tmp/test/basic_ticket_sample_app`;

  beforeEach(() => {
    mkdir("-p", src);
    cp(
      "-rf",
      `${cwd}/src/test/fixtures/basic_ticket_sample_app/*`,
      `${cwd}/tmp/test/basic_ticket_sample_app`
    );
    editor = fsEditor.create(memFs.create());
    editor.write(`${src}/v2/src/javascripts/legacy_app.js`, "var a = true");
    options = Map({ src, editor });
  });

  afterEach(() => {
    rm("-rf", src);
    editor.delete(`${src}/v2/src/javascripts/legacy_app.js`);
  });

  describe("when --replace-v1 is false, or not set", () => {
    before(() => (dest = `${src}/v2`));
    it("should save files to a v2 folder", async () => {
      await subject(options);
      expect(test("-e", `${dest}/src/javascripts/legacy_app.js`)).to.be.true;
    });
  });

  describe("when --replace-v1 is true", () => {
    beforeEach(() => {
      options = options.set("replaceV1", true);
    });

    it("should save files to the root of the v1 app folder", async () => {
      options = await subject(options);
      dest = options.get("dest");
      expect(dest).not.to.match(/\/v2$/);
      expect(test("-e", `${dest}/src/javascripts/legacy_app.js`)).to.be.true;
    });

    it("should backup the v1 app source files to a v1 folder", async () => {
      expect(test("-e", `${dest}/app.js`)).to.be.true;
      options = await subject(options);
      dest = options.get("dest");
      expect(test("-e", `${dest}/app.js`)).to.be.false;
      expect(test("-e", `${dest}/v1/app.js`)).to.be.true;
    });
  });
});
