import { expect } from "chai";
import { mkdir, rm, cp } from "shelljs";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import migrateCommonJS from "../../steps/migrate_common_js";
import { Map } from "immutable";

describe("migrate common js", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/common_js_sample_app`;
  const dest = `${cwd}/tmp/test/v2/common_js_sample_app`;

  beforeEach(() => {
    mkdir("-p", `${dest}/src/javascripts`);
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  afterEach(() => rm("-rf", `${dest}/*`));

  describe("with no v1 `lib` folder", () => {
    before(() => {
      cp("-R", `${src}/lib/`, `${src}/_lib`);
      rm("-rf", `${src}/lib/`);
    });
    after(() => {
      cp("-R", `${src}/_lib/`, `${src}/lib`);
      rm("-rf", `${src}/_lib/`);
    });

    it("does nothing", async () => {
      options = await migrateCommonJS(options);
      expect(options).not.to.exist;
      expect(editor.exists(`${dest}/src/javascripts/lib/utilities.js`)).to.be
        .false;
    });
  });

  describe("with a v1 `lib` folder", () => {
    it("copies the lib folder to the destination", async () => {
      options = await migrateCommonJS(options);
      expect(options.has("hasCommonJS")).to.be.true;
    });

    it("rewrites require statements within to be relative", async () => {
      await migrateCommonJS(options);
      const code = editor.read(`${dest}/src/javascripts/lib/utilities.js`);
      expect(code).to.match(/require\("\.\/utilities\/string\.js"\)/);
    });
  });
});
