'use strict';

require('../../');
let angular = require('angular');

let searchInputDemo = angular.module('searchInputDemo', ['npdcUi', 'templates']);

searchInputDemo.controller('SearchInputDemoCtrl', ($scope, NpolarApiSecurity) => {
  $scope.options = require('../faceting/demo/facets.json');
});
