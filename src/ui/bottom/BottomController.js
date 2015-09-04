'use strict';

// @ngInject  
var BottomController = function ($scope, $location, NpolarApiSecurity) {
  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;
};

module.exports = BottomController;