'use strict';

// @ngInject
var searchInputDirective = function () {
  return {
    template: require('./searchInput.html'),
    // @ngInject
    controller: function ($scope, $element, $location, NpdcSearchService, npdcAppConfig) {
      npdcAppConfig.search.immidiate = true;
      $scope.options = npdcAppConfig.search;

      $scope.$watch('q', (newVal, oldVal) => {
        if (newVal !== oldVal) {
          let query = Object.assign({},
            $location.search(),
            {q: newVal});
          NpdcSearchService.search(query);
        }
      });

      $element[0].querySelector('input').focus();
    }
  };
};

module.exports = searchInputDirective;
