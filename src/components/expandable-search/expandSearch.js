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
    controller: function($scope, $element, $mdMedia, $timeout, NpdcFacetingService) {
      $scope.$mdMedia = $mdMedia;
      $scope.isOpen = false;
      $scope.isFiltersOpen = false;
      $scope.q = "";

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

        // Wait for transition
        $timeout(() => {
          $scope.$broadcast('reCalcViewDimensions');
        }, 501);
        return false;
      };

      $scope.close = function($event, force) {
        if ($event.keyCode === 27 || force) {
          $scope.isOpen = false;
        }
      };

      $scope.search = function(q) {
        $scope.options.onSearch.call(this, q);
      };

      $scope.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
      };

      $scope.filterCount = null;

      NpdcFacetingService.on('search-change', function (event, data) {
        $scope.filterCount = data.count || 0;
      });

    }
  };
};

module.exports = expandSearch;
