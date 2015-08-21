"use strict";

var angular = require('angular');

angular.module('npdcMaterial')
  .directive('npdcTopMenu', function () {
    return {
      restrict: 'E',
      template: require('./topMenu.html')
    };
  });
