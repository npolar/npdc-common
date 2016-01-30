'use strict';

/**
 * @ngInject
 */
let gcmd = function(npdcGcmdService) {

  return {
    template: '<formula:field field="array"></formula:field>',
    scope: true,
    //@ngInject,
    controller($scope) {
      $scope.array = $scope.field.fields.find(field => field.id === 'sciencekeywords');
    },
    link(scope, iElement, iAttrs) {
      iElement.addClass('formulaCustomObject');
    }
  };
};

module.exports = gcmd;
