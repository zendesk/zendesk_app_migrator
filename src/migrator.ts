import "es6-promise/auto";
import chalk from "chalk";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { emojify } from "node-emoji";
import * as ProgressBar from "progress";
import { has } from "lodash";
import { List, Map } from "immutable";
import * as Insight from "insight";
const pkg = require("../package.json");
import { prompt } from "inquirer";

// This monkeypatch is necessary for for–await-of to work in Typescript v2.4+
(Symbol as any).asyncIterator =
  Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");

export interface CliOptions {
  path: string;
  replaceV1?: boolean;
  insight?: boolean;
  noInsight?: boolean;
  auto?: boolean;
}

class Migrator {
  insight: Insight;
  progressBar: ProgressBar;

  private static TRACKING_CODE = "migrator";

  private static _instance: Migrator;
  static get instance(): Migrator {
    if (!this._instance) {
      this._instance = new Migrator();
    }
    return this._instance;
  }

  static steps: List<string> = List([
    "setup_paths",

    "correct_version",
    "marketing_only",
    "requirements_only",

    "setup_app_scaffold",

    "migrate_common_js",
    "migrate_app_js",
    "migrate_app_css",
    "migrate_templates",
    "migrate_translations",
    "migrate_images",
    "migrate_manifest",

    "commit_changes",

    "run_scripts"
  ]);

  constructor() {
    this.progressBar = new ProgressBar(
      ` [:bar] ${chalk.bold(":current/:total")} steps complete`,
      {
        total: Migrator.steps.size - 1, // FIXME: run_scripts has it's own output
        complete: chalk.bold.green("="),
        incomplete: chalk.green("-"),
        width: 20
      }
    );
    this.insight = new Insight({
      trackingCode: "UA-970836-50",
      pkg
    });
  }

  async *perform(options: Map<string, any>) {
    for (const stepName of Migrator.steps[Symbol.iterator]()) {
      options = options.set("step", stepName);
      const step = this.importStep(stepName);
      const newOptions = await step(options);
      options = options.merge(newOptions);
      yield options;
    }
  }

  importStep(stepName: string) {
    return require(`./steps/${stepName}`).default;
  }

  static async migrate(cliOptions: CliOptions) {
    // Create an in-memory file system for app source
    const store = memFs.create();
    const editor = fsEditor.create(store);
    // Make a new instance of the Migrator
    const mgtr = Migrator.instance;
    // optOut will be undefined the first time insight runs
    if (has(cliOptions, "noInsight") || has(cliOptions, "insight")) {
      mgtr.insight.optOut = !cliOptions.insight;
    } else if (mgtr.insight.optOut === undefined) {
      // Have either of the explicit options been passed?
      await new Promise(res => mgtr.insight.askPermission(null, res));
    }
    // Create options to be passed through steps
    // Flags passed to the CLI will be merged in
    const options: Map<string, any> = Map({
      editor
    }).merge(cliOptions);

    if (cliOptions.auto) {
      const { auto } = await prompt([
        {
          type: "confirm",
          name: "auto",
          message: `You've used the ${chalk.bold(
            "auto"
          )} flag.  Auto migration is experimental and may be unstable, do you wish to proceed anyway?`,
          default: true
        }
      ]);
      if (!auto) {
        console.log(
          chalk.bold.red(`Migration cancelled ${emojify(":crying_cat_face:")}`)
        );
        return;
      }
    }
    // Iterate asynchronously through the steps,
    // passing the resulting options object from each step
    // into the next step
    try {
      for await (const newOptions of mgtr.perform(options)) {
        if (!mgtr.progressBar.complete) mgtr.progressBar.tick();
      }
      console.log(chalk.bold.green(emojify("Finished all steps! :rocket:")));
      mgtr.insight.track(Migrator.TRACKING_CODE, "done");
    } catch (err) {
      mgtr.progressBar.interrupt(chalk.bold.red(err.message));
      mgtr.insight.track(Migrator.TRACKING_CODE, "error", options.get("step"));
      throw err;
    }
  }
}

export default Migrator;
