"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.directive('npdcFormulaPerson', require('./person/personDirective'));

common.service('npdcGcmdService', require('./gcmd/gcmdService'));
common.directive('npdcFormulaGcmdKeyword', require('./gcmd/gcmdKeywordDirective'));
