require('shelljs/global');
require('es6-promise/auto');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const recast = require('recast');
const co = require('co');
const memFs = require('mem-fs');
const fsEditor = require('mem-fs-editor');
const AppValidator = require('./app_validator');
const types = recast.types;
const n = types.namedTypes;
const b = types.builders;

const TMP_DIR = path.join(__dirname, '../tmp');
mkdir('-p', TMP_DIR);

const SPECIAL_NPM_SCRIPTS = [
  'install',
  'test'
];

const runNpmScript = (cmd, cwd) => {
  return new Promise((res, rej) => {
    let args = [cmd];
    if (SPECIAL_NPM_SCRIPTS.indexOf(cmd) === -1) {
      args.unshift('run');
    }
    cmd = args.join(' ');
    console.log(chalk.green(`- npm ${cmd}`));
    exec(cmd, {
      silent: true,
      cwd
    }, code => res(code));
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
  constructor(appDir, dryRun) {
    this.appDir = appDir;
    this.dryRun = dryRun;
    this.setupFileSystem();
    // this.setupAppValidator();
    // this._steps = [
    //   'validate',
    //   'parseAppJS',
    //   'transformAST',
    //   'saveFiles',
    //   'runScripts'
    // ];
  }

  setupFileSystem() {
    // Create a new unique dir on file system for migrating
    this.migrateDir = fs.mkdtempSync(TMP_DIR + path.sep);
    // Create an in-memory file system for app source
    this.appFs = fsEditor.create(memFs.create());
    // Copy files from app source to in-memory store
    this.appFs.copy(this.appDir, 'app/');
    // Create an in-memory file system for migrated source
    this.migrateFs = fsEditor.create(memFs.create());
    // Copy files from app scaffold as basis for migrated app source
    this.migrateFs.copy('./node_modules/app_scaffold/**', this.migrateDir);
  }

  // setupAppValidator() {
  //   this.appValidator = new AppValidator(this.appFs);
  //   const validators = fs.readdirSync('./lib/validators');
  //   validators.forEach(name => {
  //     this.appValidator.add(require(`./validators/${path.basename(name, '.js')}`));
  //   });
  // }

  perform() {
    const _this = this;
    return co(function* () {
      // This is a bit ugly right now, but these tasks
      // are sequential.  Would be cool if they could be
      // run in parallel somehow
      yield [
        _this.validate(),
        _this.parseAppJS(),
        _this.transformAST(),
        _this.saveFiles(),
        _this.runScripts()
      ];
      return true;
    });
  }

  validate() {
    // const seq = ASQ()
    //   .then(done => {
    //     const validators = fs.readdirSync('./lib/validators');
    //     console.log(validators);
    //     seq.then(
    //       ...validators.map(name => {
    //         console.log(path.basename(name, '.js'));
    //         return require(`./lib/validators/${path.basename(name, '.js')}`)
    //       })
    //     );
    //     done();
    //   }).or(() => {
    //     console.log(chalk.red.bold('Nope'));
    //   });

    // const appValidator = this.appValidator;
    // console.log(chalk.gray('Validating app'));
    // return co(function* () {
    //   const isValid = yield appValidator.validate();
    //   console.log(chalk.green.bold('...OK'));
    //   return true;
    // });
  }

  parseAppJS() {
    console.log(chalk.gray('Parsing app.js'));
    return new Promise(res => {
      const appJS = this.appFs.read('app/app.js');
      this.ast = recast.parse(appJS);
      console.log(chalk.green.bold('...OK'));
      res();
    });
  }

  transformAST() {
    console.log(chalk.gray('Transforming app.js'));

    // TODO: Traverse the AST properly to find the relevant return statement
    const src = this.ast.program.body[0].expression.callee.body.body[0].argument.properties;

    // This turns the `events` and `requests` hashes into getter properties
    const classProps = src.map(prop => {
      if (n.ObjectExpression.check(prop.value)) {
          return b.methodDefinition(
            'get',
            prop.key,
            b.functionExpression(
              null,
              [],
              b.blockStatement([
                b.returnStatement(prop.value)
              ])
            )
          );
        } else {
          return b.methodDefinition(
            'method',
            prop.key,
            prop.value
          );
        }
    });

    this.ast.program = b.program([
      b.classDeclaration(
        b.identifier('MigratedApp'),
        b.classBody(classProps)
      )
    ]);

    console.log(chalk.green.bold('...OK'));

    // Return a Promise so as perform can resolve
    return Promise.resolve();
  }

  saveFiles() {
    console.log(chalk.gray('Saving files'));

    const code = recast.prettyPrint(this.ast, {
      tabWidth: 2
    }).code;

    const indexTpl = './lib/templates/index.ejs';
    const destFile = `${this.migrateDir}/src/javascripts/index.js`;
    this.migrateFs.copyTpl(indexTpl, destFile, { code });

    return new Promise(res => {
      if (this.dryRun) {
        console.log(chalk.yellow.bold('Would have saved files'));
        this.migrateFs.store.each(file => {
          console.log(`- ${chalk.yellow(file.path)}`);
        });
        return res();
      }

      this.migrateFs.commit(() => {
        console.log(chalk.green.bold('...OK'));
        res();
      })
    });
  }

  runScripts() {
    const migrateDir = this.migrateDir;
    console.log(chalk.gray('Building app'));
    return co(function* () {
      yield [
        runNpmScript('install', migrateDir),
        runNpmScript('build', migrateDir)
      ];
      console.log(chalk.green.bold('...OK'));
    });
  }

  static migrate(appDir, dryRun) {
    return new Migrator(appDir, dryRun).perform();
  }
}

module.exports = Migrator;
