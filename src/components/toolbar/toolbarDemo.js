'use strict';

require('../../');
let angular = require('angular');

angular.module('toolbar', ['npdcUi']).controller('ToolbarCtrl', function ($scope) {
  $scope.myToolbar = {
    title: 'Appname',
    sidenav: true
  };
});
