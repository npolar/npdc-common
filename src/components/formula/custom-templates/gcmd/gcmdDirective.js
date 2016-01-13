'use strict';

/**
 * @ngInject
 */
let gcmd = function(npdcGcmdService) {

  return {
    template: require('./gcmd.html'),
    scope: true,
    //@ngInject
    controller($scope) {
      $scope.field = $scope.field.fields.find(field => field.id === 'sciencekeywords');
      $scope.field.fields[0].customTemplate = '<npdc:formula-gcmd-keyword></npdc:formula-gcmd-keyword>';
      console.log($scope.field);
    }
  };
};

module.exports = gcmd;
