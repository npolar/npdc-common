'use strict';

let Entities = require('special-entities');

// @ngInject
var AutocompleteController = function($filter, $location, $window, $q, $scope,
  NpolarApiResource, NpdcSearchService) {
  $scope.options.q = $scope.options.q || ($location.search().q || "");

  let unescape = function (text) {
    return Entities.normalizeEntities(text, 'utf-8');
  };

  let getPath = function (entry) {
    let path;
    if ($scope.options.base) {
      path = `${$scope.options.base}/${entry.id}`;
    } else {
      let collection = Object.keys($scope.collections).find(collection => new RegExp(collection).test(entry.schema));
      if (entry && entry.schema) {
        if (collection) {
          path = `/${ collection }/${ entry.id }`;
        }
      } else if (entry && entry.collection) {
        path = `/${ entry.collection }/${ entry.id }`;
      }
    }
    return path;
  };

  $scope.title = function (entry) {
    let t = entry.title || entry.name || entry.code || $filter('lang')(entry.titles, 'title') || entry.id;
    t = t.split('_').join('');
    return unescape(t);
  };

  // Search all collections for text q
  $scope.querySearch = function(q) {
    // Merge in default query, respect url
    let query = Object.assign({}, $location.search(), $scope.options.query, {q});
    let searchCollections = [];
    Object.keys($scope.options.collections).forEach(c => {
      if ($scope.options.collections[c]) {
        searchCollections.push(c);
      }
    });

    let resources = searchCollections.map(s => {
      // Force starting /
      return NpolarApiResource.resource({ path: '/' + s.replace(/^\//, '')});
    });
    return $q.all(resources.map(resource => resource.array(query).$promise))
      .then(results => results.reduce((a, b) => a.concat(b)).sort((a, b) => a._score < b._score));
  };

  $scope.selectedItemChange = function(entry) {
    if (!entry) {
      return;
    }
    $window.location.path = getPath(entry);
  };

  $scope.submit = function ($event) {
    NpdcSearchService.search(Object.assign({}, $location.search(), {q: $scope.options.q}));
  };
};

module.exports = AutocompleteController;
