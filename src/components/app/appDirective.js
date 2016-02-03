"use strict";

let appWrapper = function() {
  'ngInject';

  return {
    restrict: 'E',
    template: require('./app.html'),
    controller: 'NpdcAppController'
  };
};

module.exports = appWrapper;
