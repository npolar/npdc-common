"use strict";

// @ngInject

let appWrapper = function() {
  return {
    restrict: 'E',
    template: require('./app.html'),
    controller: 'NpdcAppController'
  };
};

module.exports = appWrapper;
