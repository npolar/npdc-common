"use strict";
/**
 * @ngInject
 */
var AutoConfig = function(environment) {
  var config = {};

  this.isTest = function(hostname) {
    return (/test/.test(hostname.split(".")[0]));
  };

  this.detectEnvironment = function(hostname) {
    var environment;
    if ("localhost" === hostname) {
      environment = "development";
    } else if (this.isTest(hostname)) {
      environment = "test";
    } else if ("api.npolar.no" === hostname) {
      environment = "production";
    }
    return environment;
  };

  this.base = function(environment) {
    var base;
    if ("development" === environment) {
      base = "//localhost:9393";
    } else if ("test" === environment) {
      base = "//apptest.data.npolar.no";
    } else if ("production" === environment || undefined === environment || null === environment) {
      base = "//api.npolar.no";
    } else {
      throw "Unknown environment";
    }
    return base;
  };


  // Auto-detect environment - only allow overriding on localhost
  if ("localhost" === window.location.hostname && (typeof environment === 'string' || environment instanceof String)) {
    console.error("Environment:", environment, "[localhost override]");
  } else {
    environment = this.detectEnvironment(window.location.hostname);
    console.log("Environment:", environment, "[auto-detected]");
  }

  config.base = this.base(environment);
  config.environment = environment;


  if ("production" === environment && window) {
    if ("https:" !== window.location.protocol) {
      console.error("WARNING", "Not using HTTPS in production environment");
    }
    if ("data.npolar.no" !== window.location.hostname) {
      console.error("WARNING", "Running against production API", config.base, "from", window.location.href);
    }
  }
  return config;

};

module.exports = AutoConfig;
