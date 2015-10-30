'use strict';

// @ngInject
let SearchService = function ($location, $window, npdcAppConfig) {
  return {
    search (query) {
      console.log('changeSearch', query);

      if (/^\/home\/search/.test($location.path())) {
        $location.search(query);
      } else if (/^\/home/) {
        $window.location.href = '/home/search?q='+query.q;
      } else {
        $location.search(query);
      }
    }
  };
};

module.exports = SearchService;
