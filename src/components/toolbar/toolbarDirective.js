"use strict";

// @ngInject
let toolbar = function ($mdSidenav) {
    return {
      restrict: 'E',
      scope: {
        options: '='
      },
      template: require('./toolbar.html'),
    };
  };

module.exports = toolbar;
