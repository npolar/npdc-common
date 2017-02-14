"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.service('formulaAutoCompleteService', require('./autocomplete/autocompleteSourceService'));
common.directive('npdcFormulaAutocomplete', require('./autocomplete/autocompleteDirective'));

common.controller('NpdcFormulaFileController', require('./file/FileController'));
common.directive('npdcFormulaFile', require('./file/fileDirective'));

common.directive('npdcFormulaPerson', require('./person/personDirective'));

common.service('npdcGcmdService', require('./gcmd/gcmdService'));
common.directive('npdcFormulaGcmd', require('./gcmd/gcmdDirective'));
common.directive('npdcFormulaGcmdKeyword', require('./gcmd/gcmdKeywordDirective'));

common.directive('npdcFormulaPlacename', require('./placename/placenameDirective'));

common.service('npdcCSVService', require('./tabdata/csvService'));
common.directive('npdcFormulaTabdata', require('./tabdata/tabdataDirective'));
