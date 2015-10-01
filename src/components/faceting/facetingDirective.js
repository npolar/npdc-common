"use strict";

// @ngInject
let sidenav = function () {
    return {
        restrict: 'E',
        template: require('./faceting.html'),
        scope: {
            data: '=facets'
        },
        controller: 'NpdcMdFacetingCtrl'
    };
};

module.exports = sidenav;
