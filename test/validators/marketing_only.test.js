const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const memFs = require('mem-fs');
const fsEditor = require('mem-fs-editor');
const marketingOnly = require('../../lib/validators/marketing_only');
describe('marketing only', function() {
  let fs;

  before(function() {
    fs = fsEditor.create(memFs.create());
  });

  afterEach(function() {
    fs.delete('app/manifest.json');
  });

  it('should pass when not marketing only', function() {
    fs.writeJSON('app/manifest.json', {
      marketingOnly: false
    });
    expect(marketingOnly(fs)).to.eventually.be.fulfilled;
  });

  it('should raise an exception when marketing only', function() {
    fs.writeJSON('app/manifest.json', {
      marketingOnly: true
    });
    expect(() => marketingOnly(fs)).to.throw(Error,
      /"marketingOnly" parameter cannot be true for migration/);
  });
});
