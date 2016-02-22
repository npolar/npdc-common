'use strict';

var loaderDirective = function() {
  'ngInject';

  return {
    template: require('./loader.html'),
    scope: false
  };
};

module.exports = loaderDirective;
