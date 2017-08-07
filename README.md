## Zendesk App Migrator

[![Build Status](https://travis-ci.com/zendesk/zendesk_app_migrator.svg?token=NrEwEcTp68fyVJNwBJNv&branch=master)](https://travis-ci.com/zendesk/zendesk_app_migrator)

### What is it?

The App Migrator ("ZAF") is CLI tool for assisting with the migration of v1 App Framework apps to v2

### How does it work?

The migrator executes a series of tasks to:
- Reorganise files and folders
- Update the manifest file
- Rewrite JavaScript code from app.js to CommonJS modules
- Creates an HTML file from template that imports all the necessary deps., including v1 shims/helpers

#### App Scaffold

The migrator has a hard dependency on the public [App Scaffold](https://github.com/zendesk/app_scaffold) project.

When a v1 app is migrated, we leverage the features already built into the App Scaffold to transpile v1 app assets for v2.

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

### Deployment

The App Migrator will be deployed as a node package, and/or as a dependency of other projects.
