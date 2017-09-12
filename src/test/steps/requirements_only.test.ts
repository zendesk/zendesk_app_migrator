import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const { expect } = chai;
import { mkdir, rm, exec } from "shelljs";
import subject from "../../steps/requirements_only";
import { Map } from "immutable";

describe("requirements only", () => {
  let options: Map<string, any>;
  const src = `${process.cwd()}/tmp/test/v1_app`;

  beforeEach(() => {
    mkdir("-p", src);
    options = Map({ src });
  });

  afterEach(() => {
    rm("-rf", src);
  });

  describe("with an app.js file present", () => {
    beforeEach(() => exec(`echo '' > ${src}/app.js`));

    it("should pass when there is no requirements.json", () => {
      return expect(subject(options)).to.eventually.be.fulfilled;
    });

    it("should pass when there is a requirements.json", () => {
      exec(`echo '' > ${src}/requirements.json`);
      return expect(subject(options)).to.eventually.be.fulfilled;
    });
  });

  describe("with no app.js file present", () => {
    it("should pass when there is no requirements.json", () => {
      return expect(subject(options)).to.eventually.be.fulfilled;
    });

    it("should raise exception when there is a requirements.json", () => {
      exec(`echo '' > ${src}/requirements.json`);
      return expect(subject(options)).to.eventually.be.rejectedWith(Error);
    });
  });
});
