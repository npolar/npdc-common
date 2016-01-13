"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.directive('npdcFormulaAutocomplete', () => ({ scope: false, template: require('./autocomplete.html') }));
common.directive('npdcFormulaCheckbox', () => ({ scope: false, template: require('./checkbox.html') }));
common.directive('npdcFormulaDate', () => ({ scope: false, template: require('./date.html') }));
common.directive('npdcFormulaFieldArray', () => ({ scope: false, template: require('./fieldArray.html') }));
common.directive('npdcFormulaFieldInfo', () => ({ scope: false, template: require('./fieldInfo.html') }));
common.directive('npdcFormulaFieldsetArray', () => ({ scope: false, template: require('./fieldsetArray.html') }));
common.directive('npdcFormulaFile', () => ({ scope: false, template: require('./file.html') }));
common.directive('npdcFormulaFileObject', () => ({ scope: false, template: require('./fileObject.html') }));
common.directive('npdcFormulaInput', () => ({ scope: false, template: require('./input.html') }));
common.directive('npdcFormulaObject', () => ({ scope: false, template: require('./object.html') }));
common.directive('npdcFormulaRange', () => ({ scope: false, template: require('./range.html') }));
common.directive('npdcFormulaSelect', () => ({ scope: false, template: require('./select.html') }));
common.directive('npdcFormulaValidationMessage', () => ({ scope: false, template: require('./validationMessage.html') }));
