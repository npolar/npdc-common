"use strict";

// @ngInject

let appWrapper = function() {
  return {
    restrict: 'E',
    template: require('./appWrapper.html'),
    controller: 'NpdcAppWrapperCtrl'
  };
};

module.exports = appWrapper;
