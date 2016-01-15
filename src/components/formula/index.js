"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

require('./templates');
require('./custom-templates');

common.directive('npdcFormula', require('./formulaDirective'));
common.directive('initMdField', require('./initMdFieldDirective'));

common.run(function($templateCache, npolarApiConfig) {
  $templateCache.put('formula/material.html', require('./template.html'));
  npolarApiConfig.formula.template = 'material';
});
