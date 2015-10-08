'use strict';

require('../../');
let angular = require('angular');

angular.module('main', ['npdcMaterial']).controller('MainCtrl', function ($scope) {
  let appName = 'Appname';

  $scope.mySidenav = {
    title: appName,
    menu: [{
      title: 'Item1',
      link: '#item1',
      alt: 'Link to Item1'
    },
    {
      title: 'Item2',
      link: '#item2',
      alt: 'Link to Item2'
    }]
  };

  $scope.myToolbar = {
    title: appName,
    sidenav: true
  };
});
