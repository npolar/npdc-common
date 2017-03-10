'use strict';

function fileDirective() {
  'ngInject';

  return {
    template: require('./file.html'),
    scope: false,
    controller: 'NpdcFormulaFileController'
  };
}

module.exports = fileDirective;