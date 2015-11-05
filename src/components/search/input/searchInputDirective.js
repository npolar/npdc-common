'use strict';

// @ngInject
var searchInputDirective = function () {
  return {
    scope: {
      options: '=',
      feed: '='
    },
    template: require('./searchInput.html'),
    // @ngInject
    controller: function ($scope, $element, $location, NpdcSearchService, npdcAppConfig) {
      $scope.options = $scope.options || {};
      Object.assign($scope.options, npdcAppConfig.search.local,
        $scope.options, $scope.feed ? {facets: $scope.feed.facets} : {});
      $scope.q = $location.search().q;
      $scope.isFiltersOpen = false;

      $scope.$watch('q', (newVal, oldVal) => {
        if (newVal !== oldVal) {
          let query = Object.assign({},
            $location.search(),
            {q: newVal});
          NpdcSearchService.search(query);
        }
      });

      $scope.$watch('feed', (newVal, oldVal) => {
        if (newVal && newVal.facets) {
          $scope.options.facets = newVal.facets;
        }
      });

      $scope.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
      };

      $element[0].querySelector('input').focus();
    }
  };
};

module.exports = searchInputDirective;
