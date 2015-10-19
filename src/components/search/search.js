'use strict';

/**
 * @ngInject
 */
var Search = function () {
  return {
    controller: 'NpdcSearchController',
    templateUrl: 'npdc-common/src/components/search/search.html',
    link: function(scope) {
      console.log('title', scope.title);
    }
  };
};

module.exports = Search;
