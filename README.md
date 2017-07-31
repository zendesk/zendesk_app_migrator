## Zendesk App Migrator

[![Build Status](https://travis-ci.com/zendesk/zendesk_app_migrator.svg?token=NrEwEcTp68fyVJNwBJNv&branch=master)](https://travis-ci.com/zendesk/zendesk_app_migrator)

### What is it?

The App Migrator ("ZAF") is CLI tool for assisting with the migration of v1 App Framework apps to v2

### How does it work?

The migrator executes a series of tasks to:
- Reorganise files and folders
- Update the manifest file
- Rewrite Javascript code from app.js to CommonJS modules
- Creates an HTML file from template that imports all the necessary deps., including v1 shims/helpers
- ?

#### App Scaffold

The migrator has a hard dependency on the public [App Scaffold](https://github.com/zendesk/app_scaffold) project.

### For development...

Source files are under `src`, test files under `src/test`.  The codebase currently makes use of ES6 features by way of the Typescript compiler.  To that end, all of the source code is written in Typescript.  An added bonus is that the package will ship with type declarations alongside the Javascript.

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

#### Running tests

`yarn test`

Tests are run using the `mocha` test runner.  `chai` is the assertion library.

#### Other scripts

- `yarn test-watch`
- `yarn build`
- `yarn build-watch`

### Deployment

The App Migrator will be deployed as a node package, and/or as a dependency of other projects.
