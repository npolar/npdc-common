'use strict';

var angular = require('angular');

var isNumberRange = function (field) {
  return ['integer', 'number'].indexOf(field.schema.type) !== -1 && !(angular.isUndefined(field.minimum) || angular.isUndefined(field.maximum));
};

var isNormalInput = function (field) {
  return ['integer', 'number', 'string'].indexOf(field.schema.type) !== -1;
};

var hasSubFields = function (field) {
  return field.fields instanceof Array;
};

var applyMdType = function (field) {
  field.mdType = field.schema.type;
  if (isNumberRange(field)) {
    field.mdType = 'range';
  } else if (field.schema.enum) {
    field.mdType = 'select';
  } else if (isNormalInput(field)) {
    field.mdType = 'input';
  } else if (hasSubFields(field)) {
    field.fields.forEach(field => {
      applyMdType(field.fields);
    });
  }
};

angular
  .module('ngMaterial')
  .directive('applyMdType', function () {
    return {
      restrict: 'A',
			require: [ '^formula' ],
			scope: { field: '=applyMdType' },
    	link: function(scope, element, attrs, controller) {
        applyMdType(scope.field);
      }
    };
  });
