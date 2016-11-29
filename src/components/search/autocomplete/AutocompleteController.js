'use strict';

var AutocompleteController = function($location, $window, $q, $scope,
  NpolarApiResource, NpdcSearchService, npolarDocumentUtil) {
    'ngInject';

  if (!$scope.options) {
    $scope.options = {};
  }
  $scope.options.q = $scope.options.q || ($location.search().q || "");

  let appBase = (() => {
    let baseElem = document.querySelector('base') || {};
    let baseParts = (baseElem.href || '/').split('/');
    return '/' + (baseParts.pop() || baseParts.pop());
  })();

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
    return NpdcSearchService.searchCollections(q, $scope.options);
  };

  $scope.selectedItemChange = function(entry) {
    if (!entry) {
      return;
    }
    let path = entry.path;
    if (path.includes(appBase)) {
      path = path.replace(appBase, '');
      $location.url(path);
    } else {
      $window.location.href = path;
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
