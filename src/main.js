'use strict';

var angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-npolar');

angular.module('npdcMaterial', ['ngMaterial', 'ngNpolar']);
// Don't require demo code here!

// layouts
require('./layouts/formula/applyMdType');

// compontents
require('./components/user-menu/userMenu');
require('./components/top-menu/topMenu');
require('./components/document/document');

module.exports = {};
