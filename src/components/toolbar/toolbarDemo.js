'use strict';

require('../../');
let angular = require('angular');

angular.module('toolbar', ['npdcCommon']).controller('ToolbarCtrl', function($scope, npdcAppConfig) {
  $scope.options = npdcAppConfig;
});
