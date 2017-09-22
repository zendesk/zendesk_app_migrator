#!/usr/bin/env node
import * as Git from "nodegit";
import { expect } from "chai";
import { rm } from "shelljs";
import { merge } from "lodash";
import { basename, join } from "path";
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
    { repo: "five_most_recent_app" },
    { repo: "timetracking_app" },
    { repo: "answer_suggestion_app" },
    { repo: "linked_ticket_app" },
    { repo: "notification_app" },
    { repo: "search_app" },
    { repo: "bookmarks_app" },
    { repo: "related_tickets_app" },
    { repo: "hangouts_app" },
    { repo: "text_app" },
    { repo: "highrise_app" },
    { repo: "box_app" },
    { repo: "infusionsoft_app" },
    { repo: "iframe_app" }
  ];

  afterEach(() => {
    rm("-rf", path);
  });

  async function prepareApp(app): Promise<string> {
    const tmp = mkdtempSync(join(process.cwd(), "tmp"));
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
