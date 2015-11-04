'use strict';

// @ngInject
var searchResultsDirective = function () {
  return {
    scope: {
      options: '=',
      feed: '='
    },
    controller: 'NpdcSearchResultsController',
    template: require('./searchResults.html')
  };
};

module.exports = searchResultsDirective;
