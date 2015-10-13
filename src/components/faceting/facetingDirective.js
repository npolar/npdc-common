"use strict";

// @ngInject
let sidenav = function () {
    return {
        restrict: 'E',
        template: require('./faceting.html'),
        scope: {
            data: '=',
            options: '='
        },
        controller: 'NpdcFacetingCtrl'
    };
};

module.exports = sidenav;
