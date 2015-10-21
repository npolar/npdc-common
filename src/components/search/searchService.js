'use strict';

// @ngInject
let SearchService = function ($location, NpdcFacetingService, NpdcAutocompleteConfig) {

  let changeSearch = function (query) {
    console.log('changeSearch', query);
    $location.search(query);
  };

  NpdcFacetingService.on('filter-change', (event, data) => {
    changeSearch(data.q);
  });

  NpdcAutocompleteConfig.on('search-change', (event, data) => {
    changeSearch(data);
  });
};

module.exports = SearchService;
