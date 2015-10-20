'use strict';

let Entities = require('special-entities');

// @ngInject
var AutocompleteController = function($filter, $location, $window, $q, $scope, NpolarApiResource, NpdcAutocompleteConfig) {

  $scope.config = NpdcAutocompleteConfig;
  $scope.collections = NpdcAutocompleteConfig.collections;
  $scope.selectedDefault = NpdcAutocompleteConfig.selectedDefault;
  $scope.collectionSelected = {};
  $scope.collections.forEach(c => {
    $scope.collectionSelected[c] = $scope.selectedDefault.includes(c) ? true : false;
  });
  $scope.query = $scope.query || { q: $location.search().q };

  let unescape = function(text) {
    return Entities.normalizeEntities(text, 'utf-8');
  };

  $scope.title = (entry) => {
    let t = entry.title || entry.name || entry.code || $filter('lang')(entry.titles, 'title') || entry.id;
    t = t.split('_').join('');
    return unescape(t);
  };

  // Search all collections for text q
  $scope.querySearch = function(q) {
    // Merge in default query, respect url
    let query = Object.assign($location.search(), NpdcAutocompleteConfig.query, $scope.query);

    let searchCollections = $scope.collections.filter(c => {
      return $scope.collectionSelected[c];
    });

    let resources = searchCollections.map(s => {
      s = s.replace(/^\/, ''/); //Remove trail
      let path = `/${s}`;
      let service = { path };
      return NpolarApiResource.resource(service);
    });

    return $q.all(resources.map(resource => resource.array(query).$promise))
      .then(results => results.reduce((a, b) => a.concat(b)).sort((a, b) => a._score < b._score));
  };

  $scope.selectedItemChange = function(entry) {
    if (!entry) {
      return;
    }

    let path;

    if (NpdcAutocompleteConfig.base) {
      path = `${NpdcAutocompleteConfig.base}/${entry.id}`;
    } else {

      let collection = $scope.collections.find(collection => new RegExp(collection).test(entry.schema));
      if (entry && entry.schema) {
        if (collection) {
          path = `/${ collection }/${ entry.id }`;
        }
      } else if (entry && entry.collection) {
        path = `/${ entry.collection }/${ entry.id }`;
      }
    }

    $window.location.path = path;
  };

  $scope.submit = function ($event) {
    NpdcAutocompleteConfig.emit('search-change', Object.assign($location.search(), $scope.query));
  };
};

module.exports = AutocompleteController;
