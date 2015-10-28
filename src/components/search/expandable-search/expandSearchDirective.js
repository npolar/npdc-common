"use strict";

// @ngInject
let expandSearch = function() {

  return {
    restrict: 'E',
    scope: {
      options: '='
    },
    template: require('./expandSearch.html'),
    // @ngInject
    controller: function($scope, $element, $mdMedia, $timeout, $location, NpdcSearchService, npdcAppConfig) {

      $scope.$mdMedia = $mdMedia;
      $scope.isOpen = false;
      $scope.isFiltersOpen = false;

      Object.assign($scope.options.autocomplete, $scope.query, {
        location: '/',
        respectUrl: false
      });

      $scope.placeholder = $scope.options.placeholder || 'Search ' + npdcAppConfig.toolbarTitle;

      $scope.blockEvent = function($event) {
        $event.stopImmediatePropagation();
        return false;
      };

      $scope.open = function() {
        let input = $element[0].querySelector('.np-es-input input');
        if (input) {
          input.focus();
        }

        // Firefox workaround
        $timeout(() => {
          $scope.isOpen = true;
        }, 1);

        return false;
      };

      $scope.keyup = function($event) {
        if ($event.keyCode === 27) {
          $scope.close();
        }
        if ($event.keyCode === 13) {
          $scope.close();
        }
      };

      $scope.close = function () {
        $scope.isOpen = false;
      };

      $scope.search = function(q) {
        let query = Object.assign({},
          $location.search(),
          q || {q: $scope.options.autocomplete.q});
        NpdcSearchService.search(query);
      };

      $scope.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
      };

      $scope.$on('autocomplete-navigate', $scope.close);
    }
  };
};

module.exports = expandSearch;
