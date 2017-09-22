#!/usr/bin/env node
import * as Git from "nodegit";
import { expect } from "chai";
import { rm } from "shelljs";
import { merge } from "lodash";
import { basename } from "path";
import { mkdtempSync } from "fs";
import Migrator from "../../migrator";

describe("integration tests", () => {
  let path;

  const options = {
    auto: true,
    force: true,
    quiet: true
  };
  const apps: any[] = [
    { repo: "user_data_app" },
    { repo: "five_most_recent_app" }
  ];

  afterEach(() => {
    rm("-rf", path);
  });

  async function prepareApp(app): Promise<string> {
    const tmp = mkdtempSync("../tmp/");
    const repo = await Git.Clone(`https://github.com/zendesk/${app.repo}`, tmp);
    return tmp;
  }

  apps.forEach(app => {
    describe(`migrate: ${app.repo}`, () => {
      it("should migrate without errors", async () => {
        path = await prepareApp(app);
        await Migrator.migrate(merge({ path }, options));
      });
    });
  });
});
