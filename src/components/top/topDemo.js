'use strict';

require('../../');
let angular = require('angular');

angular.module('topDemo', ['npdcUi', 'templates']).controller('TopDemoCtrl', function ($scope) {
  $scope.myToolbar = {
    title: 'Appname',
    sidenav: true
  };
});
