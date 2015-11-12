'use strict';

// @ngInject
var searchResultsDirective = function () {
  return {
    scope: {
      options: '=',
      feed: '='
    },
    controller: 'NpdcSearchResultsController',
    template: require('./searchResults.html'),
    link(scope) {
      scope.resource = scope.$parent.resource;
      scope.error = scope.$parent.error;
    }
  };
};

module.exports = searchResultsDirective;
