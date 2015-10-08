"use strict";

// @ngInject
let expandSearch = function () {
    return {
      restrict: 'E',
      template: require('./expandSearch.html')
    };
  };

module.exports = expandSearch;
