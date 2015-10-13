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
        document.querySelector('.np-es-input input').focus();
        $scope.isOpen = true;
        setTimeout(() => {
          $scope.$broadcast('reCalcViewDimensions');
        }, 500);
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
