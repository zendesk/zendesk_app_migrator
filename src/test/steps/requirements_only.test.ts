import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const { expect } = chai;
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/requirements_only";
import { fromJS, Map } from "immutable";
describe("requirements only", () => {
  let editor;
  let options: Map<string, any>;

  before(() => {
    editor = fsEditor.create(memFs.create());
    options = fromJS({ editor });
  });

  beforeEach(() => {
    editor.write("v1/app.js", `var a = "b"`);
  });

  afterEach(() => {
    editor.delete("v1/*");
  });

  describe("with an app.js file present", () => {
    it("should pass when there is no requirements.json", () => {
      return expect(subject(options)).to.eventually.be.fulfilled;
    });

    it("should pass when there is a requirements.json", () => {
      editor.writeJSON("v1/requirements.json", {});
      return expect(subject(options)).to.eventually.be.fulfilled;
    });
  });

  describe("with no app.js file present", () => {
    it("should pass when there is a requirements.json", () => {
      editor.writeJSON("v1/requirements.json", {});
      return expect(subject(options)).to.eventually.be.fulfilled;
    });

    it("should pass when there is no requirements.json", () => {
      return expect(subject(options)).to.eventually.be.fulfilled;
    });
  });
});
