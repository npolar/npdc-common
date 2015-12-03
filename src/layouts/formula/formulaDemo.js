'use strict';

require('../../');
require('formula');
require('../../../wrappers/filefunnel');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcUi', 'formula', 'filefunnel'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $compile) => {
    $scope.formulaData = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "material"
    };
  });
