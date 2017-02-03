"use strict";

let FilterCollection = require('./FilterCollection');
let QueryBuilder = require('./QueryBuilder');
let urlFilterParser = require('./urlFilterParser');

let FacetingCtrl = function($scope, $location, $timeout, NpdcSearchService) {
  'ngInject';

  let ctrl = this;

  ctrl.clickedFacet = (f) => {
    //console.log('ctrl.clickedFacet', f);
  };

  let queryBuilder = new QueryBuilder();
  const UI_TYPES = ['autocomplete', 'checkbox', 'range', 'hidden'];
  let isURLParsed = false;
  let sliders = {};

  let filterChangeCallback = function (filters) {
    let q = queryBuilder.build(filters);
    NpdcSearchService.search(q);
    $scope.$emit('filter-change', {q, count: filters.length});
  };

  let filters = new FilterCollection($scope, filterChangeCallback);

  let uiType = function(facet) {

    let _type = 'autocomplete';
    // @todo facet hiding needs to be dynamic...
    let hide = ['created_by', 'updated_by']; // These are exposed in <npdc:contributions>

    if (hide.includes(facet.key)) {
      _type = 'hidden';
    } else if ($scope.options.filterUi && $scope.options.filterUi[facet.key]) {
      let optType = $scope.options.filterUi[facet.key].type;
      _type = UI_TYPES.some(type => type === optType) ? optType : _type;
    }
    return _type;
  };

  let termToInt = function(term) {
    return typeof term === 'string' ? parseInt(term.replace(/-/g, '')) : term;
  };

  let onSliderEnd = function(sliderId) {
    let facet = sliders[sliderId];
    if (facet.slider.min === facet.slider.options.floor &&
      facet.slider.max === facet.slider.options.ceil) {
      filters.removeRangeFilter(facet);
    } else {
      filters.addRangeFilter(facet);
    }
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
      options: {
        id: facet.key,
        onEnd: onSliderEnd,
        floor: Math.min(min, floor),
        ceil: Math.max(max, ceil)
      },
      min: min,
      max: max
    };
    sliders[facet.key] = facet;

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
        facet.querySearch = function(q) {
          q = q || '';
          return facet[facet.key].filter(item =>
            item.term.toString().toLowerCase().indexOf(q.toLowerCase()) === 0);
        };
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
  $scope.filters = ctrl.filters;

  ctrl.filters = () => {
    if (!filters || !filters.array) {
      return [];
    }
    return filters.array;
  };

  ctrl.activeFilters = () => (ctrl.filters().length > 0);

  $scope.removeFilter = function(filter) {
    let facet = $scope.model.find(facet => facet.key === filter.facet);
    $scope.selectedChip = -1;
    filters.remove(filter);
    if (facet && facet.slider) {
      facet.slider.min = facet.slider.options.floor;
      facet.slider.max = facet.slider.options.ceil;
    }
  };


  // Autocomplete value selected
  ctrl.selectedItemChange = function(item, facet) {
    if (item) {
      filters.add(item);
    }
    // @todo Close filters?
  };


  // Checkbox
  $scope.toggleSelect = function(item) {
    if (item.selected) {
      filters.add(item);
    } else {
      filters.remove(item);
    }
  };

  // Content
  $scope.i18n = function(key) {
    return 'field.'+key;
  };

};

module.exports = FacetingCtrl;
