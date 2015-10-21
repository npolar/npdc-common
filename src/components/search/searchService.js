'use strict';

// @ngInject
let SearchService = function ($location) {
  return {
    search (query) {
      console.log('changeSearch', query);
      $location.search(query);
    }
  };
};

module.exports = SearchService;
