"use strict";

// @ngInject

let appWrapper = function() {
  return {
    restrict: 'E',
    scope: {
      wrapped: '='
    },
    template: require('./appWrapper.html'),
    controller: 'NpdcMdAppWrapperCtrl'
  };
};

module.exports = appWrapper;
