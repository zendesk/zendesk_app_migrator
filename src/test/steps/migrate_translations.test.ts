import { expect } from "chai";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { mkdir, rm } from "shelljs";
import subject from "../../steps/migrate_translations";
import { Map } from "immutable";

describe("migrate translations", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/tmp/test/v1_app`;
  const dest = `${cwd}/tmp/test/v2_app`;

  beforeEach(() => {
    mkdir("-p", [src, dest]);
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  afterEach(() => {
    rm("-rf", [src, dest]);
  });

  it("should copy all translation files to the destination", async () => {
    const translations = ['en.json', 'fr.json', 'es.json'];
    translations.forEach((file) => {
      editor.write(`${src}/translations/${file}`, "");
    });
    await subject(options);
    translations.forEach((file) => {
      expect(editor.exists(`${dest}/src/translations/${file}`)).to.be.true;
    });
  });
});
