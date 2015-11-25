'use strict';

require('../../');
let angular = require('angular');

let appDemo = angular.module('appDemo', ['npdcUi', 'templates']);

appDemo.controller('AppDemoCtrl', ($scope, NpolarApiSecurity, NpolarApiMessage) => {
  NpolarApiSecurity.isAuthorized = () => true;
  $scope.resource = {
    path: '/demo'
  };

  $scope.error = function () {
    NpolarApiMessage.emit('npolar-error', 'error');
  };

  $scope.info = function () {
    NpolarApiMessage.emit('npolar-info', 'info');
  };
});

// Routing
appDemo.config(function ($routeProvider) {
  $routeProvider.otherwise({
    templateUrl: 'demo.tmpl',
    controller: 'AppDemoCtrl'
  });
});
