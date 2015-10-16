"use strict";

const FilterCollection = require('./FilterCollection');
const QueryBuilder = require('./QueryBuilder');

// @ngInject
const FacetingCtrl = function($scope, NpdcFacetingService) {
  let filters = new FilterCollection();
  let queryBuilder = new QueryBuilder();
  const UI_TYPES = ['autocomplete', 'checkbox', 'range'];

  let uiType = function(facet) {
    let _type = 'autocomplete';
    if ($scope.options && $scope.options[facet.key]) {
      let optType = $scope.options[facet.key].type;
      _type = UI_TYPES.some(type => type === optType) ? optType : _type;
    }
    return _type;
  };

  let termToInt = function(term) {
    return typeof term === 'string' ? parseInt(term.replace(/-/g, '')) : term;
  };

  let initRangeFacet = function (facet, oldFacet) {
    let floor, ceil, min, max;
    if (facet[facet.key].length === 1) {
      floor = ceil = min = max = termToInt(facet[facet.key][0].term);
    } else {
      floor = min = facet[facet.key].reduce((prev, term) =>
        Math.min(prev.term ? termToInt(prev.term) : prev, termToInt(term.term)));
      ceil = max = facet[facet.key].reduce((prev, term) =>
        Math.max(prev.term ? termToInt(prev.term) : prev, termToInt(term.term)));
    }

    if (oldFacet && oldFacet.slider) {
      facet.slider = oldFacet.slider;
    } else {
      facet.slider = {
        floor,
        ceil,
        min: floor,
        max: ceil
      };
    }

    return facet;
  };

  let initDataModel = function () {
    $scope.model = $scope.data.map(facet => {
      let oldFacet;
      facet.key = Object.keys(facet)[0];
      oldFacet = $scope.model ? $scope.model.find(item => item.key === facet.key) : null;
      facet.type = uiType(facet);
      facet[facet.key] = facet[facet.key].map(term => {
        let oldTerm;
        term.facet = facet.key;
        oldTerm = oldFacet ? oldFacet[facet.key].find(ot => ot.term === term.term) : null;
        if (oldTerm && oldTerm.selected) {
          term.selected = true;
        }
        return term;
      });

      if (facet.type === 'range') {
        facet = initRangeFacet(facet, oldFacet);
      }

      if (facet.type === 'autocomplete') {
        facet.searchText = "";
      }

      return facet;
    });
  };

  // Init data model
  initDataModel();
  $scope.$watch('data', (newVal, oldVal) => {
    initDataModel();
  });

  filters.on('change', function(filters) {
    let q = queryBuilder.build($scope.q, filters);
    NpdcFacetingService.emit('search-change', {q, count: filters.length});
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
    let facet = $scope.model.find(facet => facet.key === filter.facet);
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
  $scope.onSliderEnd = function(facet) {
    if (facet.slider.min === facet.slider.floor &&
      facet.slider.max === facet.slider.ceil) {
      filters.removeRangeFilter(facet);
    } else {
      filters.addRangeFilter(facet);
    }
  };

};

module.exports = FacetingCtrl;
