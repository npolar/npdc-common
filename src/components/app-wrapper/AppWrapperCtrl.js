"use strict";

// @ngInject

let AppWrapperCtrl = function($scope) {
  if ($scope.wrapped !== undefined) {
    $scope.wrapper = $scope.wrapped;
  }
};

module.exports = AppWrapperCtrl;
