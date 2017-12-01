import { expect } from "chai";
import { merge, identity } from "lodash";
import { stub } from "sinon";
import * as inquirer from "inquirer";
import Migrator from "../migrator";
import { Map, List } from "immutable";

describe("Migrator", () => {
  let mgtr: Migrator,
    cliOptions,
    steps: List<string>,
    trackStub: sinon.SinonStub,
    askStub: sinon.SinonStub,
    tickStub: sinon.SinonStub,
    stepStub: sinon.SinonStub;

  before(() => {
    mgtr = Migrator.instance;
    trackStub = stub(mgtr.insight, "track");
    askStub = stub(mgtr.insight, "askPermission");
    steps = Migrator.steps.toList();
    Migrator.steps = List(["test_step"]);
    tickStub = stub(mgtr.progressBar, "tick");
    stepStub = stub(mgtr, "importStep").withArgs("test_step").returns(identity);
  });

  after(() => (Migrator.steps = steps));

  beforeEach(() => (cliOptions = { path: "" }));

  afterEach(() => {
    mgtr.insight.optOut = undefined;
    trackStub.reset();
    askStub.reset();
  });

  describe("insight", () => {
    describe("when --insight and --no-insight aren't provided", () => {
      let promptStub;
      beforeEach(() => {
        askStub.callsFake((_, cb) => cb());
        promptStub = stub(inquirer, "prompt").returns(
          Promise.resolve({ optIn: true })
        );
      });
      afterEach(() => promptStub.restore());
      it("should ask for permission", async () => {
        await Migrator.migrate(cliOptions);
        expect(askStub.called).to.be.true;
      });
    });
    describe("with --insight", () => {
      it("shouldn't ask for permission", async () => {
        await Migrator.migrate(
          merge(cliOptions, {
            insight: true
          })
        );
        expect(askStub.called).to.be.false;
      });
      it("should try to track data", async () => {
        await Migrator.migrate(
          merge(cliOptions, {
            insight: true
          })
        );
        expect(trackStub.called).to.be.true;
      });
    });
    describe("with --no-insight", () => {
      it("shouldn't ask for permission", async () => {
        await Migrator.migrate(
          merge(cliOptions, {
            noInsight: true
          })
        );
        expect(askStub.called).to.be.false;
      });
      it("shouldn't try to track data", async () => {
        const _saveStub = stub(mgtr.insight, "_save");
        await Migrator.migrate(
          merge(cliOptions, {
            noInsight: true
          })
        );
        expect(_saveStub.called).to.be.false;
        _saveStub.restore();
      });
    });
  });
});
