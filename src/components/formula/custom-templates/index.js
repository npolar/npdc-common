"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.directive('npdcFormulaPerson', require('./person/personDirective'));

common.service('npdcGcmdService', require('./gcmd/gcmdService'));
common.directive('npdcFormulaGcmd', require('./gcmd/gcmdDirective'));
common.directive('npdcFormulaGcmdTree', require('./gcmd/gcmdTreeDirective'));
common.directive('npdcFormulaGcmdTreeItem', require('./gcmd/gcmdTreeItemDirective'));
