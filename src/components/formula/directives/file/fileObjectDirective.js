'use strict';

let fileObjectDirective = function () {
  'ngInject';

  return {
    template: require('./fileObject.html'),
    scope: false
  };
};

module.exports = fileObjectDirective;
