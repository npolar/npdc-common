'use strict';

// @ngInject
var loaderDirective = function() {
  return {
    template: require('./loader.html')
  };
};

module.exports = loaderDirective;
