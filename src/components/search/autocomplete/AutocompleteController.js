'use strict';

var AutocompleteController = function($location, $window, $q, $scope,
  NpolarApiResource, NpdcSearchService, npolarDocumentUtil) {
    'ngInject';

  $scope.options.q = $scope.options.q || ($location.search().q || "");
  let appBase = (() => {
    let baseElem = document.querySelector('base') || {};
    let baseParts = (baseElem.href || '/').split('/');
    return '/' + (baseParts.pop() || baseParts.pop());
  })();

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

  $scope.title = npolarDocumentUtil.title;

  // Search all collections for text q
  $scope.querySearch = function(q) {
    // Merge in default query, respect url ?
    q = (q || '').toLocaleLowerCase();
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
      .then(results => results.reduce((a, b) => a.concat(b)).sort((a, b) => {
        let aIndex = $scope.title(a).toLocaleLowerCase().indexOf(q);
        let bIndex = $scope.title(b).toLocaleLowerCase().indexOf(q);

        // sort on best title match q
        let sort = 0;
        if (aIndex === bIndex === -1) {
          // sort on score
          if (a._score < b._score) {
            sort = -1;
          } else if (a._score > b._score) {
            sort = 1;
          }
        } else {
          if (aIndex !== -1 && bIndex !== -1) {
            // sort on title
            if (aIndex < bIndex) {
              sort = -1;
            } else if (aIndex > bIndex) {
              sort = 1;
            }
          } else {
            // one of a and b is -1
            sort = bIndex === -1 ? -1 : 1;
          }
        }

        return sort;
      }));
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
