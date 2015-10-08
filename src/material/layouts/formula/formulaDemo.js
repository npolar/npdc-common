'use strict';

require('../../');
require('formula');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcMaterial', 'formula'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $compile) => {
    $scope.formulaData = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "material"
    };
});
