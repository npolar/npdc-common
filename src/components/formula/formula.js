'use strict';

/**
 * @ngInject
 */
var formula = function (npdcAppConfig) {
  return {
    templateUrl: 'npdc-common/src/components/formula/edit.html',
    link(scope, iElement, iAttrs) {
      scope.$watch('document', (newVal) => {
        if (newVal) {
          npdcAppConfig.cardTitle = newVal._rev ? newVal.title || newVal.id.slice(0,8) :
            'New document, not yet saved';
        }
      }, true);
    }
  };
};

module.exports = formula;
