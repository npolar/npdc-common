"use strict";

var angular = require('angular');
var npdcMaterial = angular.module('npdcMaterial');

npdcMaterial.directive('applyMdType', require('./formula/applyMdType'));

// run block
npdcMaterial.run(function($templateCache) {
  $templateCache.put('formula/material.html', require('./formula/template.html'));
});
