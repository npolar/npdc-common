'use strict';

require('../../../');
let angular = require('angular');

let demo = angular.module('autocompleteDemo', ['npdcUi', 'templates']);

demo.controller('demoCtrl', ($scope, NpolarApiSecurity) => {
  // noop
});

demo.run(npdcAppConfig => {
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
