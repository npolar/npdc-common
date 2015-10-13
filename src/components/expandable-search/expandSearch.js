"use strict";

// @ngInject
let expandSearch = function() {

  return {
    restrict: 'E',
    template: require('./expandSearch.html'),
    // @ngInject
    controller: function($scope, $element, $mdMedia) {
      $scope.$mdMedia = $mdMedia;
      $scope.isOpen = false;
      $scope.blockEvent = function($event) {
        console.log('block', $event);
        $event.stopImmediatePropagation();
        return false;
      };

      $scope.open = function() {
        console.log('firefox!');
        document.querySelector('.np-es-input input').focus();

        // Firefox workaround
        setTimeout(() => {
          $scope.isOpen = true;
        }, 1);

        // Wait for transition
        setTimeout(() => {
          $scope.$broadcast('reCalcViewDimensions');
        }, 501);
        return false;
      };

      $scope.close = function($event, force) {
        console.log('close', $event);
        if ($event.keyCode === 27 || force) {
          $scope.isOpen = false;
        }
      };

    }
  };
};

module.exports = expandSearch;
