"use strict";

// @ngInject
let toolbar = function () {
    return {
      restrict: 'E',
      template: require('./toolbar.html')
    };
  };

module.exports = toolbar;
