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
    controller: function($scope, $element, $mdMedia, $timeout, $location, NpdcFacetingService, npdcAppConfig) {
      $scope.$mdMedia = $mdMedia;
      $scope.isOpen = false;
      $scope.isFiltersOpen = false;
      $scope.query = { q: $location.search().q };
      $scope.title = npdcAppConfig.search.context || npdcAppConfig.toolbarTitle;

      $scope.blockEvent = function($event) {
        $event.stopImmediatePropagation();
        return false;
      };

      $scope.open = function() {
        document.querySelector('.np-es-input input').focus();

        //$scope.isOpen = true;
        // Firefox workaround
        $timeout(() => {
          $scope.isOpen = true;
        }, 1);

        return false;
      };

      $scope.keyup = function($event) {
        if ($event.keyCode === 27) {
          $scope.isOpen = false;
        }
        if ($event.keyCode === 13) {
          $scope.search();
        }
      };

      $scope.close = function () {
        $scope.isOpen = false;
      };

      $scope.search = function() {
        $location.search(Object.assign($location.search(), $scope.query));
      };

      $scope.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
        // Wait for transition
        $timeout(() => {
          $scope.$broadcast('reCalcViewDimensions');
        }, 550);
      };

      $scope.filterCount = null;

      NpdcFacetingService.on('search-change', function (event, data) {
        $location.search(Object.assign(data.q, $scope.query));
        $scope.filterCount = data.count || 0;
      });

    }
  };
};

module.exports = expandSearch;
