import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import requirementsOnly from "../../validators/requirements_only";
describe("requirements only", function() {
  let fs;

  before(function() {
    fs = fsEditor.create(memFs.create());
  });

  beforeEach(function() {
    fs.write(
      "app/app.js",
      `
      var a = 'b'
    `
    );
  });

  afterEach(function() {
    fs.delete("app/*");
  });

  describe("with an app.js file present", function() {
    it("should pass when there is no requirements.json", function() {
      expect(requirementsOnly(fs)).to.eventually.be.fulfilled;
    });

    // it("should fail when there is a requirements.json", function() {
    //   fs.writeJSON("app/requirements.json", {});
    //   expect(requirementsOnly(fs)).to.eventually.be.rejectedWith(
    //     Error,
    //     /A "requirements only" app cannot be migrated/
    //   );
    // });
  });

  describe("with no app.js file present", function() {
    it("should pass when there is a requirements.json", function() {
      fs.writeJSON("app/requirements.json", {});
      expect(requirementsOnly(fs)).to.eventually.be.fulfilled;
    });

    it("should pass when there is no requirements.json", function() {
      expect(requirementsOnly(fs)).to.eventually.be.fulfilled;
    });
  });
});
