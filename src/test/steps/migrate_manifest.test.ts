import * as chai from "chai";
import { merge, get } from "lodash";
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/migrate_manifest";
import { Map } from "immutable";

describe("migrate manifest", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/src/test/fixtures/basic_ticket_sample_app`;
  const dest = `${cwd}/tmp/test/v2/basic_ticket_sample_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
  });

  it("should copy the manifest to the destination", async () => {
    await subject(options);
    expect(editor.exists(`${dest}/dist/manifest.json`)).to.be.true;
  });

  it("should set frameworkVersion to 2.0", async () => {
    await subject(options);
    expect(
      editor.readJSON(`${dest}/dist/manifest.json`).frameworkVersion
    ).to.equal("2.0");
  });

  describe("location", () => {
    function setManifest(toMerge: object) {
      const manifestJson = editor.readJSON(`${src}/manifest.json`);
      editor.writeJSON(`${src}/manifest.json`, merge(manifestJson, toMerge));
    }
    describe("with a string", () => {
      before(() => setManifest({ location: "ticket_sidebar" }));
      after(() =>
        setManifest({ location: ["ticket_sidebar", "new_ticket_sidebar"] })
      );

      it("should rewrite the location to a hash", async () => {
        await subject(options);
        const manifestJson = editor.readJSON(`${dest}/dist/manifest.json`);
        expect(get(manifestJson, "location.support")).to.have.property(
          "ticket_sidebar",
          "assets/index.html"
        );
      });
    });

    describe("with an array of strings", () => {
      it("should rewrite all the locations to a hash", async () => {
        await subject(options);
        const manifestJson = editor.readJSON(`${dest}/dist/manifest.json`);
        const support = get(manifestJson, "location.support");
        expect(support).to.have.property("ticket_sidebar", "assets/index.html");
        expect(support).to.have.property(
          "new_ticket_sidebar",
          "assets/index.html"
        );
      });
    });
  });
});
