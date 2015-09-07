'use strict';

require('../../');
require('formula');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcMaterial', 'formula'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $compile) => {
    $scope.show = false;
    $scope.toggleShow = function () {
      console.log("toggle", $scope.show);
      $scope.show = !$scope.show;
    };
    $scope.formulaData = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "material"
    };
})
  .directive("textarea", function() {
  return {
    restrict: "E",
    controller: function($element) {
      $element.attr("rows", 15);
    }
  };
});
