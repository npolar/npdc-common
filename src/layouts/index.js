"use strict";

var angular = require('angular');
var ui = angular.module('npdcUi');

ui.directive('applyMdType', require('./formula/applyMdType'));

// run block
ui.run(function($templateCache) {
  $templateCache.put('formula/material.html', require('./formula/template.html'));
});
