'use strict';

// @ngInject
var SearchController = function ($scope, NpolarApiSecurity) {
  
  $scope.security = NpolarApiSecurity;
  
};

module.exports = SearchController;