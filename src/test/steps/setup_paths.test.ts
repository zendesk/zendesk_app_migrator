import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const { expect } = chai;
import { spy, stub, match } from "sinon";
import { mkdir, rm, exec } from "shelljs";
import * as inquirer from "inquirer";
import { emojify } from "node-emoji";
import subject from "../../steps/setup_paths";
import { Map } from "immutable";

describe("setup paths", () => {
  let options: Map<string, any>;
  let logSpy: sinon.SinonSpy, promptStub: sinon.SinonStub;
  const path = `${process.cwd()}/tmp/test/v1_app`;

  beforeEach(() => {
    mkdir("-p", path);
    options = Map({ path });
    logSpy = spy(console, "log");
    promptStub = stub(inquirer, "prompt");
  });

  afterEach(() => {
    rm("-rf", path);
    logSpy.restore();
    promptStub.restore();
  });

  describe("when using the --replace-v1 option", () => {
    beforeEach(() => {
      promptStub.returns(Promise.resolve({ replace: "Y" }));
      options = options.set("replaceV1", true);
    });

    describe("when current app is a migrated app", () => {
      beforeEach(() => {
        exec(`echo '{ "name": "app_scaffold" }' > ${path}/package.json`);
        mkdir("-p", `${path}/v1`);
      });

      it(`should stop and raise exception`, () => {
        return expect(subject(options)).to.eventually.be.rejectedWith(
          Error,
          `It looks like you're attempting to migrate an app that has already been migrated ${emojify(
            ":pouting_cat:"
          )}`
        );
      });
    });

    describe("when current app is not a migrated app", () => {
      it(`when rejected, should stop and raise exception`, () => {
        promptStub.returns({ replace: false });
        return expect(subject(options)).to.eventually.be.rejectedWith(
          Error,
          `Migration cancelled ${emojify(":crying_cat_face:")}`
        );
      });

      it(`when approved, should proceed and notify back up path`, async () => {
        promptStub.returns({ replace: true });
        options = await subject(options);
        expect(
          logSpy.calledWithMatch(
            match(`v1 App will be backed up to: ${path}/v1/`)
          )
        ).to.be.true;
        expect(options.get("dest")).to.match(/\/v2\/$/);
      });
    });
  });

  describe("when not using the --replace-v1 option", () => {
    it("should set destination to a v2 folder", async () => {
      options = await subject(options);
      expect(options.get("dest")).to.match(/\/v2\/$/);
    });
  });
});
