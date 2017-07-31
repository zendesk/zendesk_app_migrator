import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import marketingOnly from "../../validators/marketing_only";
describe("marketing only", function() {
  let fs;

  before(function() {
    fs = fsEditor.create(memFs.create());
  });

  afterEach(function() {
    fs.delete("app/manifest.json");
  });

  it("should pass when not marketing only", function() {
    fs.writeJSON("app/manifest.json", {
      marketingOnly: false
    });
    expect(marketingOnly(fs)).to.eventually.be.fulfilled;
  });

  it("should raise an exception when marketing only", function() {
    fs.writeJSON("app/manifest.json", {
      marketingOnly: true
    });
    expect(marketingOnly(fs)).to.eventually.be.rejectedWith(
      Error,
      /"marketingOnly" parameter cannot be true for migration/
    );
  });
});
