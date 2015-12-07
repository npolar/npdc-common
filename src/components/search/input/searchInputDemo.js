'use strict';

require('../../');
let angular = require('angular');

let searchInputDemo = angular.module('searchInputDemo', ['npdcCommon', 'templates']);

searchInputDemo.controller('SearchInputDemoCtrl', ($scope, NpolarApiSecurity) => {
  $scope.options = require('../faceting/demo/facets.json');
});
