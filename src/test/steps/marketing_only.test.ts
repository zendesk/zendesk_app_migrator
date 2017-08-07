import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import marketingOnly from "../../steps/marketing_only";
import { fromJS, Map } from "immutable";
describe("marketing only", () => {
  let editor;
  let options: Map<string, any>;

  before(() => {
    editor = fsEditor.create(memFs.create());
    options = fromJS({ src: "v1", editor });
  });

  afterEach(() => {
    editor.delete("v1/manifest.json");
  });

  it("should pass when not marketing only", () => {
    editor.writeJSON("v1/manifest.json", {
      marketingOnly: false
    });
    return expect(marketingOnly(options)).to.eventually.be.fulfilled;
  });

  it("should raise an exception when marketing only", () => {
    editor.writeJSON("v1/manifest.json", {
      marketingOnly: true
    });
    return expect(marketingOnly(options)).to.eventually.be.rejectedWith(
      Error,
      /"marketingOnly" parameter cannot be true for migration/
    );
  });
});
