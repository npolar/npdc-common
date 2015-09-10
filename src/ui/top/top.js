'use strict';

/**
 * @ngInject
 */
let Top = function () {
  return {
    //scope: {},
    controller: 'NpdcTopController',
    templateUrl: 'npdc-common/src/ui/top/npdc-top.html',
    link: function(scope) {
    }
  };
};

module.exports = Top;
