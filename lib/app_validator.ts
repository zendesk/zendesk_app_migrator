import memFs from 'mem-fs';
import fsEditor from 'mem-fs-editor';

class AppValidator {
  public fs: any;
  public validators: any[];
  private _warning: any;
  
  constructor(fs) {
    this.fs = fs;
    this._warning = null;
    this.validators = [];
  }

  get warning() {
    return `Invalid: ${this._warning}`;
  }

  add(fn) {
    this.validators.push(fn);
  }

  remove(fn) {
    const pos = this.validators.indexOf(fn);
    if (pos >= 0)
      this.validators.splice(pos, 1);
  }

  async validate() {
    this._warning = null;
    const fs = this.fs;
    const vals = this.validators;
    await vals.map(async v => await v(fs));
    return true;
  }
}

export default AppValidator;
