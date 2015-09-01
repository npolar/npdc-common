'use strict';

require('../../main');
let angular = require('angular');

angular
  .module('document', ['npdcMaterial'])
  .controller('DocumentCtrl', ($scope) => {
    $scope.document = require('./demo/doc.json');
  });
