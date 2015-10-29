'use strict';

require('../../');
let angular = require('angular');

angular.module('start', ['npdcUi'])
.controller('Start2DemoController', function(npdcAppConfig, $scope) {
	$scope.options = npdcAppConfig;
});
