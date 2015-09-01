"use strict";

// @ngInject
let npdcTopMenu = function () {
    return {
      restrict: 'E',
      template: require('./topMenu.html')
    };
  };

module.exports = npdcTopMenu;
