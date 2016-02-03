'use strict';

var searchResultsDirective = function () {
  'ngInject';

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
