'use strict';

let FilterCollection = function($scope, callback) {
  $scope.filterArray = $scope.filterArray || [];
  let calcCount = false;

  let equals = function(itemA, itemB) {
    return (itemA.term === itemB.term && itemA.facet === itemB.facet);
  };

  let isInRange = function(item, min, max) {
    let value = parseInt(item.term);
    return (value >= min && value <= max);
  };

  let termsInRange = function (facet) {
    return facet[facet.key].filter(item => isInRange(item, facet.slider.min, facet.slider.max));
  };

  let sumTermCount = function (terms) {
    return terms.reduce((memo, item) => memo + item.count, 0);
  };

  let updateCount = function (facets) {
    if (!calcCount) {
      return;
    }
    $scope.filterArray.forEach(filter => {
      let facet = facets.find(f => f.key === filter.facet);
      if (facet) {
        if (['date', 'number'].includes(filter.type)) {
          filter.count = sumTermCount(termsInRange(facet));
        } else {
          let term = facet[facet.key].find(t => t.term === filter.term);
          filter.count = term ? term.count : filter.count;
        }
      }
    });
    calcCount = false;
  };

  let add = function(filter) {
    if (!$scope.filterArray.some(item => equals(filter, item))) {
      $scope.filterArray.push(filter);
      callback($scope.filterArray);
    }
  };

  let remove = function(filter) {
    let index = $scope.filterArray.findIndex(item => equals(filter, item));
    if (index !== -1) {
      calcCount = true;
      $scope.filterArray.splice(index, 1)[0].selected = false;
      callback($scope.filterArray);
    }
  };

  let removeRangeFilter = function(facet) {
    let index = $scope.filterArray.findIndex(item => item.facet === facet.key);
    if (index !== -1) {
      calcCount = true;
      $scope.filterArray.splice(index, 1);
      callback($scope.filterArray);
    }
  };

  let addRangeFilter = function(facet) {
    let filter, existingFilter;
    let terms = termsInRange(facet);
    let isDate = /^(year)-.*$/.test(facet.key);
    filter = {
      count: sumTermCount(terms),
      term: facet.slider.min + ".." + facet.slider.max,
      facet: facet.key,
      type: isDate ? 'date' : 'number',
      min: facet.slider.min,
      max: facet.slider.max
    };
    existingFilter = $scope.filterArray.find(item => filter.facet === item.facet);
    if (!existingFilter) {
      $scope.filterArray.push(filter);
    } else {
      Object.assign(existingFilter, filter);
    }
    callback($scope.filterArray);
  };

  return {
    add,
    addRangeFilter,
    equals,
    remove,
    removeRangeFilter,
    updateCount,
    array: $scope.filterArray
  };
};

module.exports = FilterCollection;
