"use strict";

// @ngInject
let toolbar = function ($mdSidenav) {
    return {
      restrict: 'E',
      scope: {
        'toolbar': '='
      },
      template: require('./toolbar.html'),
      controller: 'NpdcMdToolbarCtrl'
    };
  };

module.exports = toolbar;
