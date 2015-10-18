'use strict';
require('should');
var AutoConfig = require('./AutoConfig');
var mockTest = function () {
  window.location = {
    href: 'http://apptest.data.npolar/dataset',
    hostname: 'apptest.data.npolar',
    protocol: 'http:'
  };
};
var mockLocalhost = function () {
  window.location = {
    href: 'http://localhost:3000/dataset',
    hostname: 'localhost',
    protocol: 'http:'
  };
};
var mockProd = function () {
  window.location = {
    href: 'http://data.npolar.no/dataset',
    hostname: 'data.npolar.no',
    protocol: 'https:'
  };
};
global.window = {};

describe('autoConfig', function () {
  let logger = {};

  // mute
  before(function () {
    logger.log = console.log;
    logger.warn = console.warn;
    console.log = console.warn = () => {};
  });

  // unmute
  after(function () {
    console.log = logger.log;
    console.warn = logger.warn;
  });

  describe('#autoConfig', function () {
    it('should detect development environment', function () {
      mockLocalhost();
      var config = new AutoConfig();
      config.environment.should.eql('development');
    });

    it('should detect test environment', function () {
      mockTest();
      var config = new AutoConfig();
      config.environment.should.eql('test');
    });

    it('should detect prod environment', function () {
      mockProd();
      var config = new AutoConfig();
      config.environment.should.eql('production');
    });

    it('should allow environment override on localhost', function () {
      mockLocalhost();
      var config = new AutoConfig('test');
      config.environment.should.eql('test');
    });

    it('should not allow environment override on test', function () {
      mockTest();
      var config = new AutoConfig('production');
      config.environment.should.eql('test');
    });

    it('should not allow environment override on prod', function () {
      mockProd();
      var config = new AutoConfig('test');
      config.environment.should.eql('production');
    });
  });
});
