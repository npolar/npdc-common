'use strict';

require('../../');
let angular = require('angular');

angular.module('main', ['npdcMaterial']).controller('MainCtrl', function ($scope) {
  $scope.mySidenav = {
    title: 'Appname',
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
});
