'use strict';

// @ngInject
let SearchService = function ($location, NpdcFacetingService, NpdcAutocompleteConfig) {

  let changeSearch = function (query) {
    $location.search(query);
  };

  NpdcFacetingService.on('filter-change', (event, data) => {
    console.log('fc c');
    changeSearch(data.q);
  });

  NpdcAutocompleteConfig.on('search-change', (event, data) => {
    console.log('ac c');
    changeSearch(data);
  });
};

module.exports = SearchService;
