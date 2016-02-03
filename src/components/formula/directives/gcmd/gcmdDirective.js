'use strict';

let gcmd = function(npdcGcmdService) {
  'ngInject';

  return {
    template: '<formula:field field="array"></formula:field>',
    controller($scope) {
      'ngInject';

      $scope.array = $scope.field.fields.find(field => field.id === 'sciencekeywords');
    },
    link(scope, iElement, iAttrs) {
      iElement.addClass('formulaCustomObject');
    }
  };
};

module.exports = gcmd;
