'use strict';

require('../../main');
var angular = require('angular');
angular
  .module('document', ['npdcMaterial'])
  .controller('DocumentCtrl', function DemoCtrl($scope) {
    $scope.document = require('./demo/doc.json');
  });
