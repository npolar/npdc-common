'use strict';

let FilterCollection = function($scope, callback) {
  $scope.filterArray = $scope.filterArray || [];

  let equals = function(itemA, itemB) {
    return (itemA.term === itemB.term && itemA.facet === itemB.facet);
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
      $scope.filterArray.splice(index, 1)[0].selected = false;
      callback($scope.filterArray);
    }
  };

  let removeRangeFilter = function(facet) {
    let index = $scope.filterArray.findIndex(item => item.facet === facet.key);
    if (index !== -1) {
      $scope.filterArray.splice(index, 1);
      callback($scope.filterArray);
    }
  };

  let isInRange = function(item, min, max) {
    let value = parseInt(item.term);
    return (value >= min && value <= max);
  };

  let addRangeFilter = function(facet) {
    let filter, existingFilter;
    let terms = facet[facet.key].filter(item => isInRange(item, facet.slider.min, facet.slider.max));

    filter = {
      count: terms.reduce((memo, item) => memo + item.count, 0),
      term: facet.slider.min + ".." + facet.slider.max,
      facet: facet.key,
      type: /^(year|month|day)-.*$/.test(facet.key) ? 'date' : 'number'
    };
    existingFilter = $scope.filterArray.find(item => filter.facet === item.facet);
    if (!existingFilter) {
      $scope.filterArray.push(filter);
    } else {
      existingFilter.term = filter.term;
      existingFilter.count = filter.count;
    }
    callback($scope.filterArray);
  };

  return {
    add,
    addRangeFilter,
    equals,
    remove,
    removeRangeFilter,
    array: $scope.filterArray
  };
};

module.exports = FilterCollection;
