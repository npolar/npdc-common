'use strict';

// @ngInject
let Top = function () {
  return {
    scope: {
      top: '='
    },
    controller: 'NpdcTopController',
    templateUrl: 'npdc-common/src/ui/top/npdc-top.html'
  };
};

module.exports = Top;
