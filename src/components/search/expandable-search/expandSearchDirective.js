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
    controller: function($scope, $element, $mdMedia, $timeout, $location,
      NpdcFacetingService, NpdcAutocompleteConfig, NpdcSearchService, npdcAppConfig) {

      $scope.$mdMedia = $mdMedia;
      $scope.isOpen = false;
      $scope.isFiltersOpen = false;
      $scope.autocompleteConfig = NpdcAutocompleteConfig;
      $scope.autocompleteOptions = Object.assign({}, $scope.options, { q: $location.search().q });

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
      };

      $scope.close = function () {
        $scope.isOpen = false;
      };

      $scope.search = function() {
        console.log('search', $scope.autocompleteOptions);
        NpdcAutocompleteConfig.emit('search-change',
          Object.assign({}, $location.search(), {q: $scope.autocompleteOptions.q}));
      };

      $scope.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
        // Wait for transition
        $timeout(() => {
          $scope.$broadcast('reCalcViewDimensions');
        }, 550);
      };

      $scope.filterCount = null;

      NpdcFacetingService.on('filter-change', function (event, data) {
        $scope.filterCount = data.count || 0;
      });

    }
  };
};

module.exports = expandSearch;
