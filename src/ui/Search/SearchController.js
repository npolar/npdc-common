'use strict';

// @ngInject
var SearchController = function ($scope, $location, NpolarApiSecurity) {
  
  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;
};

module.exports = SearchController;