"use strict";

// @ngInject
let toolbar = function ($mdSidenav) {
    return {
      restrict: 'E',
      template: require('./toolbar.html'),
      controller: 'NpdcToolbarCtrl'
    };
  };

module.exports = toolbar;
