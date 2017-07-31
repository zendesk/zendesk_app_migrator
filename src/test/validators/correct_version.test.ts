import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import correctVersion from "../../validators/correct_version";
describe("correct version", function() {
  let fs;

  before(function() {
    fs = fsEditor.create(memFs.create());
  });

  afterEach(function() {
    fs.delete("app/manifest.json");
  });

  it("should pass with a version < 2.0", function() {
    fs.writeJSON("app/manifest.json", {
      frameworkVersion: "1.0"
    });
    expect(correctVersion(fs)).to.eventually.be.fulfilled;
  });

  it("should raise an exception with a version >= 2.0", function() {
    fs.writeJSON("app/manifest.json", {
      frameworkVersion: "2.0"
    });
    expect(() => correctVersion(fs)).to.throw(
      Error,
      /"frameworkVersion" parameter must be less than 2.0/
    );
  });

  it("should raise an exception with no manifest file", function() {
    expect(() => correctVersion(fs)).to.throw(
      Error,
      /"frameworkVersion" parameter must be less than 2.0/
    );
  });
});
