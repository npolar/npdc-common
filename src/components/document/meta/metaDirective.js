'use strict';

// @ngInject
var metaDirective = function() {
  return {
    template: require('./metatemplate.html')
  };
};


module.exports = metaDirective;
