"use strict";

// @ngInject
let sidenav = function () {
    return {
      restrict: 'E',
      template: require('./sidenav.html'),
      scope: {
        sidenav: '='
      },
      controller: 'NpdcMdSidenavCtrl'
    };
  };

module.exports = sidenav;
