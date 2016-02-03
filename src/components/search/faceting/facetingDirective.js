"use strict";

let sidenav = function () {
  'ngInject';

    return {
        restrict: 'E',
        template: require('./faceting.html'),
        scope: {
            options: '='
        },
        controller: 'NpdcFacetingCtrl'
    };
};

module.exports = sidenav;
