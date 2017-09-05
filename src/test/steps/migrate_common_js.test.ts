import { expect } from "chai";
import { mkdir, rm, exec } from "shelljs";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/migrate_common_js";
import { Map } from "immutable";

describe("migrate common js", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/tmp/test/v1_app`;
  const dest = `${cwd}/tmp/test/v2_app`;

  const sampleCode = `
    module.exports = {
      test: function() { return true }
    };
  `;
  const sampleImport = `
    module.exports = {
      string: require("utils/test_utils.js")
    };
  `;

  beforeEach(() => {
    mkdir("-p", `${src}/lib/utils`);
    mkdir("-p", `${dest}/src/javascripts`);
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
    exec(`echo '${sampleCode}' > ${src}/lib/utils/test_utils.js`);
    exec(`echo '${sampleImport}' > ${src}/lib/test.js`);
  });

  afterEach(() => {
    rm("-rf", src);
    rm("-rf", dest);
  });

  describe("with no v1 `lib` folder", () => {
    beforeEach(() => rm("-rf", `${src}/lib`));

    it("does nothing", async () => {
      options = await subject(options);
      expect(options).not.to.exist;
      expect(editor.exists(`${dest}/src/javascripts/lib/test.js`)).to.be
        .false;
    });
  });

  describe("with a v1 `lib` folder", () => {
    it("copies the lib folder to the destination", async () => {
      options = await subject(options);
      expect(options.get("hasCommonJs")).to.be.true;
      expect(editor.exists(`${dest}/src/javascripts/lib/test.js`)).to.be
        .true;
    });

    it("rewrites require statements within to be relative", async () => {
      await subject(options);
      const code = editor.read(`${dest}/src/javascripts/lib/test.js`);
      expect(code).to.match(/require\("\.\/utils\/test_utils\.js"\)/);
    });
  });
});
