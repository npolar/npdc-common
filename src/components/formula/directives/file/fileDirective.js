'use strict';

let fileDirective = function () {
  'ngInject';

  return {
    template: require('./file.html'),
    scope: false
  };
};

module.exports = fileDirective;
