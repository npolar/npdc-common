'use strict';

require('../../');
let angular = require('angular');

angular.module('bottomSheetDemo', ['ngRoute', 'npdcUi', 'templates'])
  .controller('BottomSheetDemoCtrl', ($scope) => {
    $scope.items = [
      { name: 'Hangout', icon: 'hangout', action() {console.log('action!');} },
      { name: 'Mail', icon: 'mail', action() {console.log('action!');} },
      { name: 'Message', icon: 'message', action() {console.log('action!');} },
      { name: 'Copy', icon: 'copy', action() {console.log('action!');} },
      { name: 'Facebook', icon: 'facebook', action() {console.log('action!');} },
      { name: 'Twitter', icon: 'twitter', action() {console.log('action!');} },
    ];
  })
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'bottomSheetDemo.tmpl',
      controller: 'BottomSheetDemoCtrl'
    });
  });
