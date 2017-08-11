import { Map } from "immutable";
import { resolve } from "path";

export default async (options: Map<string, any>) => {
  const dest = options.get("dest");
  const editor = options.get("editor");
  // FIXME?: Would it be better to run actuall Yarn commands in the
  // dest directory to generate the .yarnrc file? (This is _potentially_ easier)
  const yarnrcTpl = "./src/templates/yarnrc.ejs";
  const destFile = `${dest}/.yarnrc`;
  const offlineCachePath = `${resolve(
    __dirname,
    "../../"
  )}/npm-packages-offline-cache`;
  editor.copyTpl(yarnrcTpl, destFile, { offlineCachePath });
};
