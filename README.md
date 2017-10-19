## Zendesk App Migration Helper

[![Build Status](https://travis-ci.com/zendesk/zendesk_app_migrator.svg?token=NrEwEcTp68fyVJNwBJNv&branch=master)](https://travis-ci.com/zendesk/zendesk_app_migrator)

### What is it?

The App Migration Helper is CLI tool for assisting with the migration of v1 App Framework apps to v2

### How does it work?

The migrator executes a series of tasks to:
- Reorganise files and folders
  - Copies templates
  - Copies translations
  - Copies stylesheets
  - Copies and rewrites Common JS modules
- Update the manifest file
  - Change to `"frameworkVersion": "2.0"`
  - Rewrite locations to v2 hash syntax
- Rewrite JavaScript code from v1 app.js
- Creates an HTML file from template that imports all the necessary deps., including v1 shims/helpers

#### App Scaffold

The migrator has a hard dependency on the public [App Scaffold](https://github.com/zendesk/app_scaffold) project.

When a v1 app is migrated, we leverage the features already built into the App Scaffold to transpile v1 app assets for v2.

### Usage

#### Options
|Option|Default|Required|Description|
|---|---|---|---|
|-p --path||Yes|The location of the v1 app|
|-r --replace-v1|false|No|Whether to backup v1 files, and replace with v2 during migration. Backed up files will be moved to a v1 folder, alongside the new v2 files.|
|-a --auto|false|No|Enables more end-to-end transformations of JavaScript, and CSS code.  See the expanded [Auto option](#auto-option) section below for more details.|

#### Auto option
__Please note that auto transforms may not work as expected.  Use with caution, and always test extensively after migration.__
For a better understanding of how auto transforms are expected to behave, look at tests for the [migrate\_app\_js step tests](https://github.com/zendesk/zendesk_app_migrator/blob/master/src/test/steps/migrate_app_js.test.ts).
Transforms currently available:
- Rewrites synchronous v1 API calls to be asynchronous.  This works by adding a shim for the [ZAF SDK APIs](https://developer.zendesk.com/apps/docs/apps-v2/api_reference).  The shim will be combined with the use of [async/awaits](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).
- Injecting JavaScript and CSS assets to support the use of the `zdSelectMenu` API available in v1.

### For development...

Source files are under `src`, test files under `src/test`.  The codebase currently makes use of ES6 features by way of the Typescript compiler.  To that end, all of the source code is written in Typescript.  An added bonus is that the package will ship with type declarations alongside the JavaScript.

#### Setting up your dev environment

You will need:

* `Yarn`
* `NodeJS`

`brew install yarn && yarn install`

#### Dependencies

Dependencies are declared via `yarn` in the `package.json` file.

#### Testing the CLI

Optionally install `ts-node` and `typescript` globally, like `npm install -g ts-node typescript`.

Run `ts-node src/index.ts migrate --path ~/path/to/v1/app/source`

If not installing `ts-node` and `typescript` globally, reference the local versions of those packages like `./node_modules/.bin/ts-node src/index.ts migrate --path ~/path/to/v1/app/source`

After running `yarn build`, it is possible to run the down-level version of the Migrator like `node ./lib/index.js migrate --path ~/path/to/v1/app/source`. Similarly, the down-level tests can be run like `./node_modules/.bin/mocha ./lib/test/**/*.test.js`.  Doing so effectively just demonstrates that the output from the Typescript compiler is valid JavaScript for NodeJS.

#### Running tests

`yarn test`

Tests are run using the [`mocha`](https://mochajs.org/) test runner. [`chai`](http://chaijs.com/) is the assertion library.  We make use of [`chai-as-promised`](https://github.com/domenic/chai-as-promised) to provide more elegant assertions against async behaviour.

#### Other scripts

- `yarn test-watch`
- `yarn build`
- `yarn build-watch`

### Contributing
We welcome contributions. First, please read the [Pull Request Guidelines](https://github.com/zendesk/zendesk_app_migrator/wiki/Pull-Request-Guidelines) and [Style Guide](https://github.com/zendesk/zendesk_app_migrator/wiki/Style-Guide) pages on our wiki.

### Deployment

The App Migrator will be deployed as a node package, and/or as a dependency of other projects.
