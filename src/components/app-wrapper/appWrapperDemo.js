'use strict';

// @ngInclude

require('../../');
let angular = require('angular');

let appDemo = angular.module('appWrapper', ['npdcUi']);

appDemo.run(npdcAppConfig => {
  npdcAppConfig.search.filterOptions = {
    'draft': {
      type: 'checkbox'
    },
    'year-released': {
      type: 'range'
    },
    'coverage.south': {
      type: 'range'
    }
  };

  npdcAppConfig.search.facets = require('../faceting/demo/facets.json').facets;
});
