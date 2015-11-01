"use strict";

let angular = require('angular');

// @ngInject
let npdcDocument = function() {
  return {
    restrict: 'E',
    template: require('./document.html'),
    link(scope) {
      scope.fancy = true;

      scope.isArray = function(value) {
        return Array.isArray(value);
      };
      scope.isObject = function(value) {
        return angular.isObject(value) && !Array.isArray(value);
      };
      scope.isItem = function(value) {
        return !(scope.isArray(value) || scope.isObject(value));
      };
    }
  };
};

module.exports = npdcDocument;
