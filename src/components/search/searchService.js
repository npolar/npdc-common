'use strict';

// @ngInject
let SearchService = function ($location, $window, npdcAppConfig) {
  return {
    search (query) {
      console.log('Search', query);
      $location.search(query);
    },
    globalSearch (query) {
      console.log('Global search', query);
      if (/^\/home\/search/.test($location.path())) {
        $location.search(query);
      } else if (/^\/home/.test($location.path())) {
        $location.$$search = query;
        $location.$$path = '/search/';
        $location.$$compose();
      } else {
        $window.location.href = '/home/search?q=' + query.q;
      }
    }
  };
};

module.exports = SearchService;
