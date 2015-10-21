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
      $scope.query = { q: $location.search().q };

      console.log($scope.options.autocomplete);
      if ($scope.options.autocomplete) {
        $scope.options.autocomplete = Object.assign({}, $scope.options.autocomplete, $scope.query);
      }
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
      };

      $scope.close = function () {
        $scope.isOpen = false;
      };

      $scope.search = function(q) {
        let query = Object.assign({},
          $location.search(),
          q,
          $scope.options.autocomplete ? {q: $scope.options.autocomplete.q} : {});
        NpdcSearchService.search(query);
      };

      $scope.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
        // Wait for transition
        $timeout(() => {
          $scope.$broadcast('reCalcViewDimensions');
        }, 520);
      };

      $scope.updateAutocompleteCollection = function (q) {
        $scope.$broadcast('update-autocomplete-collection');
      };

      $scope.filterCount = null;

      $scope.$watch('query.q', (newVal, oldVal) => {
        if (newVal !== oldVal) {
          $scope.search({q: newVal});
        }
      });

      $scope.$on('filter-change', function (event, data) {
        $scope.filterCount = data.count || 0;
        $scope.search(data.q);
      });

    }
  };
};

module.exports = expandSearch;
