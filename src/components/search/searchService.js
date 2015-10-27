'use strict';

// @ngInject
let SearchService = function ($location, npdcAppConfig) {
  return {
    search (query, location) {
      console.log('changeSearch', query, location);
      if (location) {
        $location.url(location);
      }
      $location.search(query);
    }
  };
};

module.exports = SearchService;
