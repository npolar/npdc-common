"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.directive('npdcFormulaAutocomplete', () => ({ template: require('./autocomplete.html') }));
common.directive('npdcFormulaCheckbox', () => ({ template: require('./checkbox.html') }));
common.directive('npdcFormulaDate', () => ({ template: require('./date.html') }));
common.directive('npdcFormulaFieldArray', () => ({ template: require('./fieldArray.html') }));
common.directive('npdcFormulaFieldInfo', () => ({ template: require('./fieldInfo.html') }));
common.directive('npdcFormulaFieldsetArray', () => ({ template: require('./fieldsetArray.html') }));
common.directive('npdcFormulaFile', () => ({ template: require('./file.html') }));
common.directive('npdcFormulaFileObject', () => ({ template: require('./fileObject.html') }));
common.directive('npdcFormulaInput', () => ({ template: require('./input.html') }));
common.directive('npdcFormulaObject', () => ({ template: require('./object.html') }));
common.directive('npdcFormulaRange', () => ({ template: require('./range.html') }));
common.directive('npdcFormulaSelect', () => ({ template: require('./select.html') }));
common.directive('npdcFormulaValidationMessage', () => ({ template: require('./validationMessage.html') }));
