'use strict';

// @ngInject
let SearchConfigFactory = function($location, $rootScope) {
  let results = {};
  let filterUi = {
      'year-released': {
        type: 'range'
      }
    };

  let facets = [];

  $rootScope.$on('npolar-feed', (event, data) => {
    facets = data.facets;
  });

  let constructor = function (options) {
    return Object.assign({
      results,
      filterUi,
      facets
    }, options);
  };

  return constructor;
};

module.exports = SearchConfigFactory;
