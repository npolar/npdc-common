"use strict";

let FilterCollection = require('./FilterCollection');
let QueryBuilder = require('./QueryBuilder');

// @ngInject
let FacetingCtrl = function($scope, $location, $timeout, NpdcFacetingService) {

  let queryBuilder = new QueryBuilder();
  const UI_TYPES = ['autocomplete', 'checkbox', 'range', 'hidden'];
  const FILTER_PARAM_REQEX = /^filter-(.*)/;
  let initialParse = false;
  let filters = $scope.options.filterCollection =
    $scope.options.filterCollection || new FilterCollection();

    let parseUrl = function (query) {
      if (query) {
        Object.keys(query).forEach((key) => {
          let matches = FILTER_PARAM_REQEX.exec(key);
          if (matches) {
            let facet = $scope.model.find((facet) => facet.key === matches[1]);
            let terms = query[key].split(',');
            if (facet) {
              let item = facet[facet.key].find(item => item.term === terms[0]);
              if (facet.uiType === 'range') {
                facet.slider.ceil = facet.slider.max = terms[0].split('..')[1];
                facet.slider.floor = facet.slider.min = terms[0].split('..')[0];
                filters.addRangeFilter(facet);
              } else if (facet.uiType === 'checkbox' && item) {
                item.selected = true;
                filters.add(item);
              } else {
                terms.forEach(term => {
                  let item = facet[facet.key].find(item => item.term === term);
                  filters.add(item);
                });
              }
            }
          }
        });
      }
    };

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

  let initRangeFacet = function (facet, oldFacet) {
    let floor, ceil, min, max;
    floor = ceil = min = max = termToInt(facet[facet.key][0].term);

    facet[facet.key].forEach((term, index) => {
      if (index === 0) {
        return;
      }
      floor = min = Math.min(termToInt(term.term), termToInt(facet[facet.key][index-1].term));
    });
    facet[facet.key].forEach((term, index) => {
      if (index === 0) {
        return;
      }
      ceil = max = Math.max(termToInt(term.term), termToInt(facet[facet.key][index-1].term));
    });
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
    $scope.model = $scope.options.facets.filter(facet => facet[Object.keys(facet)[0]].length > 0).map(facet => {
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
        facet = initRangeFacet(facet, oldFacet);
      }

      if (facet.uiType === 'autocomplete') {
        facet.searchText = "";
      }

      return facet;
    });

    if ($scope.model.length > 0 && !initialParse) {
      parseUrl($location.search());
      initialParse = true;
    }
  };

  // Init data model
  initDataModel();

  $scope.$watch('options.facets', (newVal, oldVal) => {
    if (newVal !== oldVal) {
      initDataModel();
    }
  });

  filters.on('change', function(filters) {
    let q = queryBuilder.build(false, filters);
    NpdcFacetingService.emit('filter-change', {q, count: filters.length});
  });

  // Respect the URL!
  $scope.$on('$locationChangeSuccess', (event, data) => {
    parseUrl(data);
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
