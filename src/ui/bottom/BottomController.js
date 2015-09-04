'use strict';

// @ngInject  
var BottomController = function ($scope, $location) {
  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;
};

module.exports = BottomController;