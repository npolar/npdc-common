"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

var templates = require('./templates');
require('./directives');

common.directive('npdcFormula', require('./formulaDirective'));

common.run(function($templateCache, npolarApiConfig) {
  npolarApiConfig.formula.templates = templates.materialTemplates;
});
