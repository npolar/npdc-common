'use strict';

require('../../');
let angular = require('angular');

angular.module('toolbar', ['npdcMaterial']).controller('ToolbarCtrl', function ($scope) {
  $scope.myToolbar = {
    title: 'Appname',
    sidenav: true
  };
});
