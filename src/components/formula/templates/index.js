"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');

common.directive('npdcFormulaFieldInfo', () => ({ scope: false, template: require('./fieldInfo.html') }));
common.directive('npdcFormulaValidationMessage', () => ({ scope: false, template: require('./validationMessage.html') }));

var materialTemplates = [
  {
    match: '@form',
    template: require('./form.html')
  },
  {
    match: '@fieldset',
    template: require('./fieldset.html')
  },
  {
    match: '@field',
    template: require('./field.html')
  },
  {
    match: '@object',
    template: require('./object.html')
  },
  {
    match: '@array',
    template: require('./array.html')
  },
  {
    match(field) {
      return field.typeOf('checkbox');
    },
    template: require('./checkbox.html')
  },
  {
    match(field) {
      return field.typeOf('date') || field.typeOf('datetime') || field.format === 'year-month';
    },
    template: require('./date.html')
  },
  {
    match(field) {
      return field.typeOf('range');
    },
    template: require('./range.html')
  },
  {
    match(field) {
      return field.typeOf('select');
    },
    template: require('./select.html')
  }
];

module.exports = {
  materialTemplates
};
