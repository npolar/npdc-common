'use strict';

// @ngInject
let SearchService = function ($location, npdcAppConfig) {
  return {
    search (query) {
      console.log('changeSearch', query);
      if (!npdcAppConfig.search.immidiate) {
        $location.url('/');
      }
      $location.search(query);
    }
  };
};

module.exports = SearchService;
