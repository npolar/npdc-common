"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

var templates = require('./templates');
require('./directives');

common.directive('npdcFormula', require('./formulaDirective'));

common.run(function($templateCache, npdcAppConfig) {
  npdcAppConfig.formula.templates = templates.materialTemplates;
});
