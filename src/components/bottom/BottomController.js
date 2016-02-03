'use strict';

var BottomController = function ($scope, $location, NpolarApiSecurity) {
  'ngInject';

  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;
};

module.exports = BottomController;
