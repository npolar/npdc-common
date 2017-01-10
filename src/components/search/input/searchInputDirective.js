'use strict';

var searchInputDirective = function () {
  'ngInject';

  return {
    scope: {
      options: '=?',
      feed: '='
    },
    template: require('./searchInput.html'),
    controllerAs: 'ctrl',
    controller: function ($scope, $location, NpdcSearchService, npdcAppConfig) {
      'ngInject';

      let ctrl = this;

      ctrl.sort = () => {
        if ($location.search().sort) {
          return $location.search().sort;
        } else if ($scope.feed) {
          if (!(/[?&]sort=/).test($scope.feed.links.find(f => f.rel==='self').href)) {
            return 'relevance';
          }
        }

      };

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

      ctrl.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
      };
    }
  };
};

module.exports = searchInputDirective;
