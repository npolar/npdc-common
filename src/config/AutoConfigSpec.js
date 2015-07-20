'use strict';
require('should');
var AutoConfig = require('./AutoConfig');
global.window = {};
describe('autoConfig', function () {
  describe('#autoConfig', function () {
    it('should detect development environment', function () {
      window.location = {
        href: 'http://localhost:3000/dataset',
        hostname: 'localhost',
        protocol: 'http:'
      };
      var config = new AutoConfig();
      config.environment.should.eql('development');
    });

    it('should detect test environment', function () {
      window.location = {
        href: 'http://apptest.data.npolar/dataset',
        hostname: 'apptest.data.npolar',
        protocol: 'http:'
      };
      var config = new AutoConfig();
      config.environment.should.eql('test');
    });

    it('should detect prod environment', function () {
      window.location = {
        href: 'http://data.npolar.no/dataset',
        hostname: 'data.npolar.no',
        protocol: 'https:'
      };
      var config = new AutoConfig();
      config.environment.should.eql('production');
    });
  });
});
