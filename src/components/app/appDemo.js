'use strict';

require('../../');
let angular = require('angular');

let appDemo = angular.module('appDemo', ['npdcCommon', 'templates']);

appDemo.controller('AppDemoCtrl', ($scope, NpolarApiSecurity, NpolarMessage) => {
  NpolarApiSecurity.isAuthorized = () => true;
  $scope.resource = {
    path: '/demo'
  };

  $scope.error = function () {
    NpolarMessage.error('error');
  };

  $scope.info = function () {
    NpolarMessage.info('info');
  };
});

// Routing
appDemo.config(function ($routeProvider) {
  $routeProvider.otherwise({
    templateUrl: 'demo.tmpl',
    controller: 'AppDemoCtrl'
  });
});
