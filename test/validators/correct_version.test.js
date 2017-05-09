const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const memFs = require('mem-fs');
const fsEditor = require('mem-fs-editor');
const correctVersion = require('../../lib/validators/correct_version');
describe('correct version', function() {
  let fs;

  before(function() {
    fs = fsEditor.create(memFs.create());
  });

  afterEach(function() {
    fs.delete('app/manifest.json');
  });

  it('should pass with a version < 2.0', function() {
    fs.writeJSON('app/manifest.json', {
      frameworkVersion: "1.0"
    });
    expect(correctVersion(fs)).to.eventually.be.fulfilled;
  });

  it('should raise an exception with a version >= 2.0', function() {
    fs.writeJSON('app/manifest.json', {
      frameworkVersion: "2.0"
    });
    expect(() => correctVersion(fs)).to.throw(Error,
      /"frameworkVersion" parameter must be less than 2.0/);
  });

  it('should raise an exception with no manifest file', function() {

    expect(() => correctVersion(fs)).to.throw(Error,
      /"frameworkVersion" parameter must be less than 2.0/);
  });
});
