"use strict";

let sidenav = function () {
  'ngInject';

    return {
        restrict: 'E',
        template: require('./faceting.html'),
        scope: {
            options: '=',
            show: '='
        },
        controller: 'NpdcFacetingCtrl',
        controllerAs: 'ctrl'
    };
};

module.exports = sidenav;
