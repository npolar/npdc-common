'use strict';

require('../../');
let angular = require('angular');

let appDemo = angular.module('appDemo', ['npdcUi', 'templates']);

appDemo.controller('demoCtrl', ($scope, NpolarApiSecurity) => {
  NpolarApiSecurity.isAuthorized = () => true;
  $scope.resource = {
    path: '/demo'
  };
});
