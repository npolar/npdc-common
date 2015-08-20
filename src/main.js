'use strict';

var angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');

angular.module('npdcMaterial', ['ngMaterial']);
// Don't require demo code here!

// layouts
require('./layouts/formula/applyMdType');

// compontents
require('./components/top-menu/topMenu');
require('./components/document/document');

module.exports = {};
