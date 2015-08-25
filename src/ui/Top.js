'use strict';

/**
 * @ngInject
 */
var TopMenu = function () {
  return {
    //scope: {},
    controller: 'NpdcTopController',
    templateUrl: 'npdc-common/src/ui/Top/npdc-top.html',
    link: function(scope) {
    }
  };
};

module.exports = TopMenu;
