"use strict";

let FilterCollection = require('./FilterCollection');
let QueryBuilder = require('./QueryBuilder');
let urlFilterParser = require('./urlFilterParser');

// @ngInject
let FacetingCtrl = function($scope, $location, $timeout, NpdcSearchService) {

  let queryBuilder = new QueryBuilder();
  const UI_TYPES = ['autocomplete', 'checkbox', 'range', 'hidden'];
  let isURLParsed = false;

  let filterChangeCallback = function (filters) {
    let q = queryBuilder.build(filters);
    NpdcSearchService.search(q);
    $scope.$emit('filter-change', {q, count: filters.length});
  };

  let filters = new FilterCollection($scope, filterChangeCallback);

  let uiType = function(facet) {
    let _type = 'autocomplete';
    if ($scope.options.filterUi && $scope.options.filterUi[facet.key]) {
      let optType = $scope.options.filterUi[facet.key].type;
      _type = UI_TYPES.some(type => type === optType) ? optType : _type;
    }
    return _type;
  };

  let termToInt = function(term) {
    return typeof term === 'string' ? parseInt(term.replace(/-/g, '')) : term;
  };

  let initRangeFacet = function (facet) {
    let floor, ceil, min, max, filter;
    facet.slider = {};

    floor = min = facet[facet.key].reduce((memo, term) => Math.min(termToInt(term.term), memo),
      termToInt(facet[facet.key][0].term));
    ceil = max = facet[facet.key].reduce((memo, term) => Math.max(termToInt(term.term), memo),
      termToInt(facet[facet.key][0].term));
    filter = $scope.filterArray.find(item => facet.key === item.facet);
    if (filter) {
      min = filter.min;
      max = filter.max;
    }
    facet.slider = {
      floor: Math.min(min, floor),
      ceil: Math.max(max, ceil),
      min: min,
      max: max
    };

    return facet;
  };

  let emptyFacet = function (facet) {
    let key = Object.keys(facet)[0];
    return facet[key].length > 1;
  };

  let initDataModel = function () {
    if (!$scope.options.facets) {
      return;
    }
    $scope.model = $scope.options.facets.filter(emptyFacet).map(facet => {
      let oldFacet;
      facet.key = Object.keys(facet)[0];
      oldFacet = $scope.model ? $scope.model.find(item => item.key === facet.key) : null;
      facet.uiType = uiType(facet);
      facet[facet.key] = facet[facet.key].map(term => {
        let oldTerm;
        term.facet = facet.key;
        oldTerm = oldFacet ? oldFacet[facet.key].find(ot => ot.term === term.term) : null;
        term.selected = oldTerm ? oldTerm.selected : undefined;
        return term;
      });

      if (facet.uiType === 'range') {
        facet = initRangeFacet(facet);
      }

      if (facet.uiType === 'autocomplete') {
        facet.searchText = "";
      }

      return facet;
    });

    filters.updateCount($scope.model);

    if (!isURLParsed && $scope.options.facets.length > 0) {
      urlFilterParser.parseUrl($scope, filters, $location.search());
      isURLParsed = true;
    }
  };

  // Init data model
  initDataModel();

  $scope.$watch('options.facets', (newVal, oldVal) => {
    if (newVal) {
      initDataModel();
    }
  });

  // Respect the URL!
  $scope.$on('$locationChangeSuccess', (event, data) => {
    urlFilterParser.parseUrl($scope, filters, $location.search());
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
  $scope.filters = () => filters.array;
  $scope.activeFilters = function() {
    return filters.array.length > 0;
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
  $scope.selectedItemChange = function(item, facet) {
    if (item) {
      filters.add(item);
    }
  };

  $scope.querySearch = function(facet) {
    return facet[facet.key].filter(item =>
      item.term.toString().toLowerCase().indexOf(facet.searchText.toLowerCase()) === 0);
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

  // Content
  $scope.i18n = function(key) {
    return 'field.'+key;
  };

};

module.exports = FacetingCtrl;
