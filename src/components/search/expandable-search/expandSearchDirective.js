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
      $scope.query = { q: $location.search().q };
      $scope.placeholder = npdcAppConfig.search.context || npdcAppConfig.toolbarTitle;
      $scope.autocompleteConfig = NpdcAutocompleteConfig;
      NpdcAutocompleteConfig.placeholder = npdcAppConfig.search.context || NpdcAutocompleteConfig.placeholder;

      $scope.blockEvent = function($event) {
        $event.stopImmediatePropagation();
        return false;
      };

      $scope.open = function() {
        $element[0].querySelector('.np-es-input input').focus();

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
        NpdcAutocompleteConfig.emit('search-change', Object.assign($location.search(), $scope.query));
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
