"use strict";

let npdcBottomSheetDirective = function() {
  'ngInject';

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
