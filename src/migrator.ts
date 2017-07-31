import { exec } from "shelljs";
import "es6-promise/auto";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import * as chalk from "chalk";
import * as recast from "recast";
import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import AppValidator from "./app_validator";
import * as emoji from "node-emoji";
const n = recast.types.namedTypes;
const b = recast.types.builders;

(Symbol as any).asyncIterator =
  Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");

const TMP_DIR = path.resolve(__dirname, "../tmp");
mkdirp.sync(TMP_DIR);

const runShellScript = (cmd, cwd = __dirname) => {
  return new Promise((res, rej) => {
    console.log(chalk.green(`- ${cmd}`));
    exec(
      cmd,
      {
        silent: true,
        cwd
      },
      (code, stdout, stderr) => {
        if (code === 0) {
          console.log(
            chalk.bold.green(emoji.emojify(`Done: ${cmd} :joy_cat:`))
          );
          res();
        } else {
          rej(stderr);
        }
      }
    );
  });
};

/**
 * Migrator
 * 1. Is this a v1 app?
 *   a. Does app have framework version < 2?
 *   b. Is this a requirements only app?
 *   c. Is this a marketing only app?
**/

class Migrator {
  private appDir: string;
  private dryRun: boolean;
  private steps: string[];
  private migrateFs: any;
  private appFs: any;
  private migrateDir: string;
  private appValidator: AppValidator;
  private currentStep: string;
  private ast: any;

  static steps: string[] = [
    "validate",
    "parseAppJS",
    "transformAST",
    "saveFiles",
    "runScripts"
  ];

  constructor(appDir, { dryRun, path, steps = "" }) {
    this.appDir = appDir;
    this.dryRun = dryRun;
    if (steps.length) {
      const userSteps = steps.toLowerCase().split(",");
      this.steps = Migrator.steps.filter(step =>
        userSteps.find(s => step.toLowerCase().indexOf(s) >= 0)
      );
    } else {
      this.steps = Migrator.steps.slice();
    }
    this.createVirtualFileSystem();
    this.appValidator = new AppValidator(this.appFs);
  }

  private createVirtualFileSystem() {
    // Create a new unique dir on file system for migrating
    this.migrateDir = fs.mkdtempSync(TMP_DIR + path.sep);
    console.log(
      chalk.gray("App will be migrated to: ") +
        chalk.bold.gray(`${this.migrateDir}`)
    );
    // Create an in-memory file system for app source
    this.appFs = fsEditor.create(memFs.create());
    // Copy files from app source to in-memory store
    this.appFs.copy(this.appDir, "app/");
    // Create an in-memory file system for migrated source
    this.migrateFs = fsEditor.create(memFs.create());
    // Copy files from app scaffold as basis for migrated app source
    this.migrateFs.copy("./node_modules/app_scaffold/**", this.migrateDir);
  }

  private async *perform() {
    const steps = this.steps.slice();
    while (steps.length) {
      this.currentStep = steps.shift();
      const value = await this[this.currentStep]();
      yield this.currentStep;
    }
  }

  validate() {
    console.log(
      chalk.bold.gray.underline("Validating whether app can be migrated")
    );
    return this.appValidator.validate();
  }

  private parseAppJS() {
    console.log(chalk.bold.gray.underline("Parsing app.js"));
    return new Promise<void>(res => {
      const appJS = this.appFs.read("app/app.js");
      this.ast = recast.parse(appJS);
      res();
    });
  }

  private async transformAST(useClassSyntax: boolean = false) {
    console.log(chalk.bold.gray.underline("Transforming app.js"));

    // TODO: Traverse the AST properly to find the relevant return statement
    const src = this.ast.program.body[0].expression.callee.body.body[0].argument
      .properties;

    if (useClassSyntax) {
      // This turns the `events` and `requests` hashes into getter properties
      const classProps = src.map(prop => {
        if (n.ObjectExpression.check(prop.value)) {
          return b.methodDefinition(
            "get",
            prop.key,
            b.functionExpression(
              null,
              [],
              b.blockStatement([b.returnStatement(prop.value)])
            )
          );
        } else {
          return b.methodDefinition("method", prop.key, prop.value);
        }
      });

      this.ast.program = b.program([
        b.classDeclaration(b.identifier("MigratedApp"), b.classBody(classProps))
      ]);
    } else {
      this.ast.program = b.program([
        b.variableDeclaration("const", [
          b.variableDeclarator(
            b.identifier("MigratedApp"),
            b.objectExpression(src)
          )
        ])
      ]);
    }
  }

  private async saveFiles() {
    console.log(chalk.bold.gray.underline("Saving files"));

    const code = recast.prettyPrint(this.ast, {
      tabWidth: 2
    }).code;

    const indexTpl = "./src/templates/index.ejs";
    const destFile = `${this.migrateDir}/src/javascripts/index.js`;
    this.migrateFs.copyTpl(indexTpl, destFile, { code });

    if (this.dryRun) {
      console.log(chalk.yellow.bold("Would have saved files"));
      this.migrateFs.store.each(file => {
        console.log(`\t- ${chalk.yellow(file.path)}`);
      });
      return;
    }

    await new Promise<void>((res, rej) => {
      this.migrateFs.commit(() => res());
    });
  }

  private async runScripts() {
    const migrateDir = this.migrateDir;
    console.log(chalk.bold.gray.underline("Building app"));
    await runShellScript("npm install", migrateDir);
    await runShellScript("npm run build", migrateDir);
    await runShellScript(`zat validate --path ${migrateDir}`);
  }

  static async migrate(appDir, dryRun) {
    const mgtr = new Migrator(appDir, dryRun);
    for await (const step of mgtr.perform()) {
      console.log(chalk.bold.green(emoji.emojify(`Done: ${step} :joy_cat:`)));
    }
    return true;
  }
}

export default Migrator;
