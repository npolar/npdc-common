"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.directive('npdcFormulaAutocomplete', () => ({ transclude: true, template: require('./autocomplete.html') }));
common.directive('npdcFormulaCheckbox', () => ({ transclude: true, template: require('./checkbox.html') }));
common.directive('npdcFormulaDate', () => ({ transclude: true, template: require('./date.html') }));
common.directive('npdcFormulaFieldArray', () => ({ transclude: true, template: require('./fieldArray.html') }));
common.directive('npdcFormulaFieldInfo', () => ({ transclude: true, template: require('./fieldInfo.html') }));
common.directive('npdcFormulaFieldsetArray', () => ({ transclude: true, template: require('./fieldsetArray.html') }));
common.directive('npdcFormulaFile', () => ({ transclude: true, template: require('./file.html') }));
common.directive('npdcFormulaFileObject', () => ({ transclude: true, template: require('./fileObject.html') }));
common.directive('npdcFormulaInput', () => ({ transclude: true, template: require('./input.html') }));
common.directive('npdcFormulaObject', () => ({ transclude: true, template: require('./object.html') }));
common.directive('npdcFormulaRange', () => ({ transclude: true, template: require('./range.html') }));
common.directive('npdcFormulaSelect', () => ({ transclude: true, template: require('./select.html') }));
common.directive('npdcFormulaValidationMessage', () => ({ transclude: true, template: require('./validationMessage.html') }));
