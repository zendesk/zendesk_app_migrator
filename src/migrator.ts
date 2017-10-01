import "es6-promise/auto";
import * as chalk from "chalk";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import { emojify } from "node-emoji";
import * as ProgressBar from "progress";
import { List, Map } from "immutable";
import { prompt } from "inquirer";
import * as logger from "winston";

// This monkeypatch is necessary for for–await-of to work in Typescript v2.4+
(Symbol as any).asyncIterator =
  Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");

export interface CliOptions {
  path: string;
  replaceV1?: boolean;
  auto?: boolean;
  force?: boolean;
  quiet?: boolean;
}

class Migrator {
  protected progressBar: ProgressBar;

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
    logger.cli();
    this.progressBar = new ProgressBar(
      ` [:bar] ${chalk.bold(":current/:total")} steps complete`,
      {
        total: Migrator.steps.size - 1, // FIXME: run_scripts has it's own output
        complete: chalk.bold.green("="),
        incomplete: chalk.green("-"),
        width: 20
      }
    );
  }

  protected async *perform(options: Map<string, any>) {
    // FIXME: Having to type the iterable as <any> is ugly
    // work out why there is a type incompatibility with the iterator
    for (const stepName of <any>Migrator.steps) {
      options = options.set("step", stepName);
      const step = require(`./steps/${stepName}`).default;
      const newOptions = await step(options);
      options = options.merge(newOptions);
      yield options;
    }
  }

  static async migrate(cliOptions: CliOptions) {
    // Create an in-memory file system for app source
    const store = memFs.create();
    const editor = fsEditor.create(store);
    // Make a new instance of the Migrator
    const migratr: Migrator = new Migrator();
    // Create options to be passed through steps
    // Flags passed to the CLI will be merged in
    const options: Map<string, any> = Map({
      editor
    }).merge(cliOptions);
    // This is so that when we're running in CI mode, we can silence
    // all of the noise and just report on pass/fail
    if (cliOptions.quiet) logger.level = "error";
    // Force may be used in CI mode so that confirmation is assumed
    if (cliOptions.auto && !cliOptions.force) {
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
        logger.warn(
          chalk.bold.red(`Migration cancelled ${emojify(":crying_cat_face:")}`)
        );
        return;
      }
    }
    // Iterate asynchronously through the steps,
    // passing the resulting options object from each step
    // into the next step
    try {
      for await (const newOptions of migratr.perform(options)) {
        if (!migratr.progressBar.complete && !cliOptions.quiet)
          migratr.progressBar.tick();
      }
      logger.info(chalk.bold.green(emojify("Finished all steps! :rocket:")));
    } catch (err) {
      migratr.progressBar.interrupt(chalk.bold.red(err.message));
      throw err;
    }
  }
}

export default Migrator;
