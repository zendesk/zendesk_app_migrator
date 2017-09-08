import { expect } from "chai";
import { merge, get } from "lodash";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { mkdir, rm } from "shelljs";
import subject from "../../steps/migrate_manifest";
import { Map } from "immutable";

describe("migrate manifest", () => {
  let editor;
  let options: Map<string, any>;
  const cwd = process.cwd();
  const src = `${cwd}/tmp/test/v1_app`;
  const dest = `${cwd}/tmp/test/v2_app`;
  const srcManifestPath = `${src}/manifest.json`;
  const destManifestPath = `${dest}/dist/manifest.json`;

  beforeEach(() => {
    mkdir("-p", [src, dest]);
    editor = fsEditor.create(memFs.create());
    options = Map({ src, dest, editor });
    editor.writeJSON(srcManifestPath, {});
  });

  afterEach(() => {
    rm("-rf", [src, dest]);
  });

  it("should copy the manifest to the destination", async () => {
    await subject(options);
    expect(editor.exists(destManifestPath)).to.be.true;
  });

  it("should set frameworkVersion to 2.0", async () => {
    setManifest({ frameworkVersion: "1.0" });
    await subject(options);
    expect(
      editor.readJSON(destManifestPath).frameworkVersion
    ).to.equal("2.0");
  });

  describe("should rewrite the location(s) to a hash", () => {
    it("should rewrite single string location", async () => {
      setManifest({ location: "ticket_sidebar" });
      await subject(options);
      const manifestJson = editor.readJSON(destManifestPath);
      expect(get(manifestJson, "location.support")).to.have.property(
        "ticket_sidebar",
        "assets/index.html"
      );
    });

    it("should rewrite all the locations to a hash", async () => {
      setManifest({ location: ["ticket_sidebar", "new_ticket_sidebar"] });
      await subject(options);
      const manifestJson = editor.readJSON(destManifestPath);
      const support = get(manifestJson, "location.support");
      expect(support).to.have.property("ticket_sidebar", "assets/index.html");
      expect(support).to.have.property("new_ticket_sidebar", "assets/index.html");
    });
  });

  function setManifest(toMerge: object) {
    const manifestJson = editor.readJSON(srcManifestPath);
    editor.writeJSON(srcManifestPath, merge(manifestJson, toMerge));
  }
});
