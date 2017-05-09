const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const memFs = require('mem-fs');
const fsEditor = require('mem-fs-editor');
const requirementsOnly = require('../../lib/validators/requirements_only');
describe('requirements only', function() {
  let fs;

  before(function() {
    fs = fsEditor.create(memFs.create());
  });

  afterEach(function() {
    fs.delete('app/*');
  });

  describe('with an app.js file present', function() {
    before(function() {
      fs.write('app/app.js', `
        var a = 'b'
      `);
    });

    it('should pass when there is no requirements.json', function() {
      expect(requirementsOnly(fs)).to.eventually.be.fulfilled;
    });

    it('should fail when there is a requirements.json', function() {
      fs.writeJSON('app/requirements.json', {});
      expect(requirementsOnly(fs)).to.eventually.be.rejectedWith(Error,
        /A "requirements only" app cannot be migrated/);
    });
  });

  describe('with no app.js file present', function() {
    it('should pass when there is a requirements.json', function() {
      fs.writeJSON('app/requirements.json', {});
      expect(requirementsOnly(fs)).to.eventually.be.fulfilled;
    });

    it('should pass when there is no requirements.json', function() {
      expect(requirementsOnly(fs)).to.eventually.be.fulfilled;
    });
  });
});
