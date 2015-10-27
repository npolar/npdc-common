'use strict';

// @ngInject
var searchResultsDirective = function () {
  return {
    controller: 'NpdcSearchResultsController',
    template: require('./searchResults.html')
  };
};

module.exports = searchResultsDirective;
