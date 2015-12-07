'use strict';

require('../../');
let angular = require('angular');

angular
  .module('document', ['npdcCommon'])
  .controller('DocumentCtrl', ($scope) => {
    $scope.document = require('./demo/doc.json');
  });
