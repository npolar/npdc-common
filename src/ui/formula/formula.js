'use strict';

/**
 * @ngInject
 */
var formula = function () {
  return {
    templateUrl: 'npdc-common/src/ui/formula/edit.html',
    link (scope) {
      console.log('formula', scope.formula);
    }
  };
};

module.exports = formula;
