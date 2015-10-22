"use strict";

// @ngInject

let appWrapper = function() {
  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    template: require('./bottomSheet.html'),
    controller: 'NpdcBottomSheetController'
  };
};

module.exports = appWrapper;
