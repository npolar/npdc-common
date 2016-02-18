"use strict";

let expandSearch = function() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      options: '='
    },
    template: require('./expandSearch.html'),
    controller: function($scope, $element, $mdMedia, $timeout, $location, NpdcSearchService, npdcAppConfig, NpolarTranslate) {
      'ngInject';

      $scope.$mdMedia = $mdMedia;
      $scope.isOpen = false;
      $scope.isFiltersOpen = false;

      Object.assign($scope.options, {
        respectUrl: false,
        q: $location.search().q
      });

      $scope.placeholder = $scope.options.placeholder || NpolarTranslate.translate('search') + ' ' + npdcAppConfig.toolbarTitle;

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

        $timeout(() => {
          $scope.isOpenDelay = true;
        }, 200);

        return false;
      };

      $scope.keyup = function($event) {
        switch ($event.keyCode) {
          case 27:
          case 13:
            $scope.close();
            break;
          case 32:
            // Workaround for angular material bug with inputs in fab-toolbar
            $scope.options.q += ' ';
            break;
          default:
            //noop;
        }
      };

      $scope.close = function () {
        $scope.isOpen = $scope.isOpenDelay = false;
      };

      $scope.search = function(q) {
        let query = Object.assign({},
          $location.search(),
          q || {q: $scope.options.q});
        NpdcSearchService.globalSearch(query);
      };

      $scope.toggleFilters = function () {
        $scope.isFiltersOpen = !$scope.isFiltersOpen;
      };

      $scope.$on('autocomplete-navigate', $scope.close);
    }
  };
};

module.exports = expandSearch;
