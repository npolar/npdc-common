'use strict';

require('../../');
let angular = require('angular');
require('angular-route');

angular.module('sidenav', ['ngRoute', 'npdcMaterial']).controller('SidenavCtrl', function ($scope, $route) {
  $scope.mySidenav = {
    title: 'Appname',
    menu: [{
      title: 'Item1',
      link: 'item1',
      alt: 'Link to Item1'
    },
    {
      title: 'Item2',
      link: 'item2',
      alt: 'Link to Item2'
    }]
  };
  console.log('route', $route.current);
}).config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/index.html', {
    template: "Start",
  }).when('/item1', {
    template: "Item1",
  }).when('/item2', {
    template: "Item2",
  });

});
