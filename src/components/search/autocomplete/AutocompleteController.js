'use strict';

let Entities = require('special-entities');

// @ngInject
var AutocompleteController = function($filter, $location, $window, $q, $scope,
  NpolarApiResource, NpdcSearchService) {
  $scope.options.q = $scope.options.q || ($location.search().q || "");
  let appBase = () => {
    let baseElem = document.querySelector('base') || {};
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
        path = `/${ collection.replace(/^\//, '') }/${ entry.id }`;
      }
    } else if (entry && entry.collection) {
      path = `/${ entry.collection.replace(/^\//, '') }/${ entry.id }`;
    }
    return path;
  };

  $scope.submit = function ($event) {
    $scope.$$childHead.$mdAutocompleteCtrl.hidden = true;
    if ($scope.options.global) {
      NpdcSearchService.globalSearch({q: $scope.options.q});
    } else {
      NpdcSearchService.search({q: $scope.options.q});
    }
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
        searchCollections.push(NpolarApiResource.resource({ path: '/' + c.replace(/^\//, '')}));
      }
    });
    return $q.all(searchCollections.map(resource => resource.array(query).$promise))
      .then(results => results.reduce((a, b) => a.concat(b)).sort((a, b) => a._score < b._score));
  };

  $scope.selectedItemChange = function(entry) {
    if (!entry) {
      return;
    }
    let path = getPath(entry);
    if (path.includes(appBase)) {
      path = path.replace(appBase, '');
      $location.url(path);
    } else {
      $window.location.href = getPath(entry);
    }
    $scope.options.q = "";
    $scope.$emit('autocomplete-navigate');
  };

  $scope.keyup = function ($event) {
    if ($event.keyCode === 13) {
      $scope.submit();
    }
  };
};

module.exports = AutocompleteController;
