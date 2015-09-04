"use strict";

// @ngInject
let npdcTopMenu = function () {
    return {
      restrict: 'E',
      template: require('./toolbar.html')
    };
  };

module.exports = npdcTopMenu;
