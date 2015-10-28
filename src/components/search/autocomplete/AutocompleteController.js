'use strict';

let Entities = require('special-entities');

// @ngInject
var AutocompleteController = function($filter, $location, $element, $window, $q, $scope,
  NpolarApiResource, NpdcSearchService) {
  $scope.options.q = $scope.options.q || ($location.search().q || "");
  let appBase = () => {
    let baseElem = document.querySelector('base');
    let baseParts = (baseElem.href || '/').split('/');
    return '/' + (baseParts.pop() || baseParts.pop());
  }();

  let unescape = function (text) {
    return Entities.normalizeEntities(text, 'utf-8');
  };

  let getPath = function (entry) {
    let path;

    let collection = Object.keys($scope.options.collections).find(collection => new RegExp(collection).test(entry.schema));
    if (entry && entry.schema) {
      if (collection) {
        path = `/${ collection }/${ entry.id }`;
      }
    } else if (entry && entry.collection) {
      path = `/${ entry.collection }/${ entry.id }`;
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
    // Merge in default query, respect url ?
    let query = Object.assign({},
      $scope.options.respectUrl ? $location.search() : {},
      $scope.options.query, {q});
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
    let path = getPath(entry);
    console.log('path', appBase, path);
    if (path.includes(appBase)) {
      path = path.replace(appBase, '');
      $location.url(path);
    } else {
      $window.location.href = getPath(entry);
    }
    $scope.options.q = "";
    $scope.$emit('autocomplete-navigate');
  };

  $scope.submit = function ($event) {
    this.$$childHead.$mdAutocompleteCtrl.hidden = true;
    NpdcSearchService.search({q: $scope.options.q}, $scope.options.location);
  };
};

module.exports = AutocompleteController;
