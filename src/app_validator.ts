import * as memFs from "mem-fs";
import * as fsEditor from "mem-fs-editor";
import * as chalk from "chalk";

import correctVersionValidator from "./validators/correct_version";
import marketingOnlyValidator from "./validators/marketing_only";
import requirementsOnlyValidator from "./validators/requirements_only";

class AppValidator {
  public fs: any;
  public validators: any[];
  private _warning: any;

  constructor(fs) {
    this.fs = fs;
    this.validators = [
      correctVersionValidator,
      marketingOnlyValidator,
      requirementsOnlyValidator
    ];
  }

  add(fn) {
    this.validators.push(fn);
  }

  remove(fn) {
    const pos = this.validators.indexOf(fn);
    if (pos >= 0) this.validators.splice(pos, 1);
  }

  private async *perform() {
    const vals = this.validators.slice();
    while (vals.length) {
      const val = vals.shift();
      const res = await val(this.fs);
      yield res;
    }
  }

  async validate() {
    for await (const v of this.perform()) {
      // console.log(chalk.bold.green("Pass: "));
    }
    return true;
  }
}

export default AppValidator;
