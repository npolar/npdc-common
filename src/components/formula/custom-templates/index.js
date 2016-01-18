"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.directive('npdcFormulaPerson', require('./person/personDirective'));

common.service('npdcGcmdService', require('./gcmd/gcmdService'));
common.directive('npdcFormulaGcmd', require('./gcmd/gcmdDirective'));
common.directive('npdcFormulaGcmdKeyword', require('./gcmd/gcmdKeywordDirective'));

common.directive('npdcFormulaPlacename', require('./placename/placenameDirective'));
