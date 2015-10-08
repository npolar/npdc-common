'use strict';

// @ngInject
let Top = function () {
  return {
    scope: {
      top: '='
    },
    controller: 'NpdcTopController',
    templateUrl: 'npdc-common/src/components/top/npdc-top.html'
  };
};

module.exports = Top;
