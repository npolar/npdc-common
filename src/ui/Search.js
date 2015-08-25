'use strict';

/**
 * @ngInject
 */
var Search = function () {
  return {
    //scope: {},
    controller: 'NpdcSearchController',
    templateUrl: 'npdc-common/src/ui/Search/search.html',
    link: function(scope) {
      console.log("npdc:search link(scope)", scope);
    }
  };
};

module.exports = Search;