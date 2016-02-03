'use strict';

var searchInputDirective = function () {
  'ngInject';

  return {
    scope: {
      options: '=?',
      feed: '='
    },
    template: require('./searchInput.html'),
    controller: function ($scope, $location, NpdcSearchService, npdcAppConfig) {
      'ngInject';
      
      $scope.options = $scope.options || {};
      Object.assign($scope.options, npdcAppConfig.search.local,
        $scope.options, $scope.feed ? {facets: $scope.feed.facets} : {});
      $scope.query =  {
        q: $location.search().q
      };
      $scope.isFiltersOpen = false;

      $scope.$watch('query.q', (newVal, oldVal) => {
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
    }
  };
};

module.exports = searchInputDirective;
