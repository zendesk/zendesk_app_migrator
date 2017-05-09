const co = require('co');
const memFs = require('mem-fs');
const fsEditor = require('mem-fs-editor');

class AppValidator {
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

  validate() {
    this._warning = null;
    const fs = this.fs;
    const vals = this.validators;
    return co(function* () {
      yield vals.map(v => {
        return co.wrap(function* () {
          return yield v(fs);
        });
      });
      return true;
    });
  }
}

module.exports = AppValidator;
