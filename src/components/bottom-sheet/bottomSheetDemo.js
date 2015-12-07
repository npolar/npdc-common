'use strict';

require('../../');
let angular = require('angular');

angular.module('bottomSheetDemo', ['ngRoute', 'npdcCommon', 'templates'])
  .controller('BottomSheetDemoCtrl', ($scope) => {
    $scope.options = {
      items: [
        { name: 'Delete', icon: 'delete', action() {console.log('action!');}, classes: 'md-warn' },
        { name: 'Mail', icon: 'mail', action() {console.log('action!');} },
        { name: 'Message', icon: 'message', action() {console.log('action!');} },
        { name: 'Copy', icon: 'copy', action() {console.log('action!');} },
        { name: 'Facebook', icon: 'facebook', action() {console.log('action!');} },
        { name: 'Twitter', icon: 'twitter', action() {console.log('action!');} },
      ],
      alwaysShow: true
    };
  })
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'bottomSheetDemo.tmpl',
      controller: 'BottomSheetDemoCtrl'
    });
  });
