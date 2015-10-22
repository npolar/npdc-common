"use strict";

// @ngInject
let npdcBottomSheetDirective = function() {
  return {
    restrict: 'E',
    scope: {
      options: '='
    },
    template: require('./bottomSheet.html'),
    controller: 'NpdcBottomSheetController'
  };
};

module.exports = npdcBottomSheetDirective;
