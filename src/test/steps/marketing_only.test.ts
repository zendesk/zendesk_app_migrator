import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const { expect } = chai;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/marketing_only";
import { Map } from "immutable";

describe("marketing only", () => {
  let editor;
  let options: Map<string, any>;
  const manifestPath = "v1/manifest.json";

  before(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ src: "v1", editor });
  });

  afterEach(() => {
    editor.delete(manifestPath);
  });

  it("should pass when not marketing only", () => {
    editor.writeJSON(manifestPath, {
      marketingOnly: false
    });
    return expect(subject(options)).to.eventually.be.fulfilled;
  });

  it("should raise an exception when marketing only", () => {
    editor.writeJSON(manifestPath, {
      marketingOnly: true
    });
    return expect(subject(options)).to.eventually.be.rejectedWith(
      Error,
      /"marketingOnly" parameter cannot be true for migration/
    );
  });

  it("should pass when there is no manifest", () => {
    return expect(subject(options)).to.eventually.be.fulfilled;
  });
});
