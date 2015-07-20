"use strict";
/**
 * @ngInject
 */
var AutoConfig = function(environment) {
  this.environment = environment;

  var isTest = function(hostname) {
    return (/test/.test(hostname.split(".")[0]));
  };

  var detectEnvironment = function(hostname) {
    var environment;
    if ("localhost" === hostname) {
      environment = "development";
    } else if (isTest(hostname)) {
      environment = "test";
    } else if ("data.npolar.no" === hostname) {
      environment = "production";
    }
    return environment;
  };

  var base = function(environment) {
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
  if ("localhost" === window.location.hostname && (typeof this.environment === 'string' || this.environment instanceof String)) {
    console.warn("Environment:", this.environment, "[localhost override]");
  } else {
    this.environment = detectEnvironment(window.location.hostname);
    console.log("Environment:", this.environment, "[auto-detected]");
  }

  this.base = base(this.environment);

  if ("production" === this.environment) {
    if ("https:" !== window.location.protocol) {
      console.warn("WARNING", "Not using HTTPS in production environment");
    }
    if ("data.npolar.no" !== window.location.hostname) {
      console.warn("WARNING", "Running against production API", this.base, "from", window.location.href);
    }
  }
  return this;

};

module.exports = AutoConfig;
