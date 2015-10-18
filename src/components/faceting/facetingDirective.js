"use strict";

// @ngInject
let sidenav = function () {
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
