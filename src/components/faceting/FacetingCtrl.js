"use strict";

const FilterCollection = require('./FilterCollection');
const QueryBuilder = require('./QueryBuilder');

// @ngInject
const FacetingCtrl = function($scope) {
  let filters = new FilterCollection();
  let queryBuilder = new QueryBuilder();

  let uiType = function(facet) {
    let _type = 'autocomplete';
    if ($scope.options && $scope.options[facet.key]) {
      _type = $scope.options[facet.key].type;
    }
    return _type;
  };

  let termToInt = function(term) {
    return parseInt(term.replace(/-/g, ''));
  };

  let initRangeFacet = function (facet) {
    let floor, ceil;
    if (facet[facet.key].length === 1) {
      floor = ceil = termToInt(facet[facet.key][0].term);
    } else {
      floor = facet[facet.key].reduce((prev, term) =>
        Math.min(prev.term ? termToInt(prev.term) : prev, termToInt(term.term)));
      ceil = facet[facet.key].reduce((prev, term) =>
        Math.max(prev.term ? termToInt(prev.term) : prev, termToInt(term.term)));
    }

    facet.slider = {
      floor,
      ceil,
      min: floor,
      max: ceil
    };

    return facet;
  };

  let initDataModel = function () {
    $scope.data = $scope.data.map(facet => {
      facet.key = Object.keys(facet)[0];
      facet.type = uiType(facet);
      facet[facet.key] = facet[facet.key].map(term => {
        term.facet = facet.key;
        return term;
      });

      if (facet.type === 'range') {
        facet = initRangeFacet(facet);
      }
      return facet;
    });
  };

  // Init data model
  initDataModel();

  // Search
  $scope.showAdvanced = false;
  $scope.toggleAdvanced = function() {
    $scope.showAdvanced = !$scope.showAdvanced;
  };

  filters.on('change', function(filters) {
    let q = queryBuilder.build($scope.q, filters);
    $scope.$emit('search-change', q);
  });


  // Chips
  $scope.selectedChip = -1;
  $scope.selectChip = function(index) {
    if ($scope.selectedChip === index) {
      $scope.selectedChip = -1;
    } else {
      $scope.selectedChip = index;
    }
  };


  // Filters
  $scope.filters = filters.array;
  $scope.activeFilters = function() {
    return $scope.filters.length > 0;
  };

  $scope.removeFilter = function(filter) {
    let facet = $scope.data.find(facet => facet.key === filter.facet);
    $scope.selectedChip = -1;
    filters.remove(filter);
    if (facet && facet.slider) {
      facet.slider.min = facet.slider.floor;
      facet.slider.max = facet.slider.ceil;
    }
  };


  // Autocomplete
  $scope.selectedItemChange = function(item) {
    if (item) {
      filters.add(item);
    }
  };

  $scope.querySearch = function(facet) {
    return facet[facet.key].filter(item =>
      item.term.toLowerCase().indexOf(facet.searchText.toLowerCase()) === 0);
  };


  // Checkbox
  $scope.toggleSelect = function(item) {
    if (item.selected) {
      filters.add(item);
    } else {
      filters.remove(item);
    }
  };


  // Range
  $scope.onSliderChange = function(facet) {
    if (facet.slider.min === facet.slider.floor &&
      facet.slider.max === facet.slider.ceil) {
      filters.removeRangeFilter(facet);
    } else {
      filters.addRangeFilter(facet);
    }
  };

};

module.exports = FacetingCtrl;
