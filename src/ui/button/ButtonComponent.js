'use strict';

// @ngInject
var DeleteButtonComponent = function ($scope, NpolarApiSecurity) {  
  $scope.security = NpolarApiSecurity;
};

module.exports = DeleteButtonComponent;