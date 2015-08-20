'use strict';

require('../../main');
require('formula');
var angular = require('angular');

angular
  .module('formulaDemo', ['ngMaterial', 'formula'])
  .controller('FormulaCtrl', function DemoCtrl($mdDialog, $scope, $compile) {
    $scope.formulaData = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "template.html"
    };
});
