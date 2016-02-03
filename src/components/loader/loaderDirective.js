'use strict';

var loaderDirective = function() {
  'ngInject';

  return {
    template: require('./loader.html')
  };
};

module.exports = loaderDirective;
