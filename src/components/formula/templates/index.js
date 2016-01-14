"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

var link = function (scope, element, attrs) {
  let directive = Object.keys(attrs).find(key => key.indexOf('npdc') !== -1);
  console.log('init', directive, 'for', scope.field.path);
};

// common.directive('npdcFormulaAutocomplete', () => ({ scope: false, template: require('./autocomplete.html'), link: link }));
// common.directive('npdcFormulaCheckbox', () => ({ scope: false, template: require('./checkbox.html'), link: link }));
// common.directive('npdcFormulaDate', () => ({ scope: false, template: require('./date.html'), link: link }));
// common.directive('npdcFormulaFieldArray', () => ({ scope: false, template: require('./fieldArray.html'), link: link }));
// common.directive('npdcFormulaFieldInfo', () => ({ scope: false, template: require('./fieldInfo.html'), link: link }));
// common.directive('npdcFormulaFieldsetArray', () => ({ scope: false, template: require('./fieldsetArray.html'), link: link }));
// common.directive('npdcFormulaFile', () => ({ scope: false, template: require('./file.html'), link: link }));
// common.directive('npdcFormulaFileObject', () => ({ scope: false, template: require('./fileObject.html'), link: link }));
// common.directive('npdcFormulaInput', () => ({ scope: false, template: require('./input.html'), link: link }));
// common.directive('npdcFormulaObject', () => ({ scope: false, template: require('./object.html'), link: link }));
// common.directive('npdcFormulaRange', () => ({ scope: false, template: require('./range.html'), link: link }));
// common.directive('npdcFormulaSelect', () => ({ scope: false, template: require('./select.html'), link: link }));
// common.directive('npdcFormulaValidationMessage', () => ({ scope: false, template: require('./validationMessage.html'), link: link }));
