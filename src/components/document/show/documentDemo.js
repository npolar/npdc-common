'use strict';

require('../../');
let angular = require('angular');

angular
  .module('document', ['npdcUi'])
  .controller('DocumentCtrl', ($scope) => {
    $scope.document = require('./demo/doc.json');
  });
