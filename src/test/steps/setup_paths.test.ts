import * as chai from "chai";
import { spy, stub, match } from "sinon";
const expect = chai.expect;
import { mkdir, rm, cp } from "shelljs";
import * as inquirer from "inquirer";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import subject from "../../steps/setup_paths";
import { Map } from "immutable";

describe("setup paths", () => {
  let editor;
  let options: Map<string, any>;
  const path = `${process.cwd()}/src/test/fixtures/basic_ticket_sample_app`;

  beforeEach(() => {
    editor = fsEditor.create(memFs.create());
    options = Map({ path, editor });
  });

  describe("when not using the --replace-v1 option", () => {
    it("should set destination to a v2 folder", async () => {
      options = await subject(options);
      expect(options.get("dest")).to.match(/\/v2\/$/);
    });
  });

  describe("when using the --replace-v1 option", () => {
    let logSpy: sinon.SinonSpy, promptStub: sinon.SinonStub;

    beforeEach(() => {
      logSpy = spy(console, "log");
      promptStub = stub(inquirer, "prompt").returns({ replace: "Y" });
    });

    afterEach(() => {
      logSpy.reset();
      promptStub.reset();
    });

    it(`should notify the user their app will be backed up to a "v1" folder`, async () => {
      options = await subject(options.set("replaceV1", true));
      expect(
        logSpy.calledWithMatch(
          match(`v1 App will be backed up to: ${path}/v1/`)
        )
      );
    });
  });
});
