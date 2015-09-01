'use strict';

let angular = require('angular');

// @ngInject
let applyMdType = function() {

  let isNumberRange = function(field) {
    return ['integer', 'number'].indexOf(field.schema.type) !== -1 && !(angular.isUndefined(field.minimum) || angular.isUndefined(field.maximum));
  };

  let isNormalInput = function(field) {
    return ['integer', 'number', 'string'].indexOf(field.schema.type) !== -1;
  };

  let hasSubFields = function(field) {
    return field.fields instanceof Array;
  };

  let setMdType = function(field) {
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

  return {
    restrict: 'A',
    require: ['^formula'],
    scope: {
      field: '=applyMdType'
    },
    link: function(scope, element, attrs, controller) {
      setMdType(scope.field);
    }
  };
};

module.exports = applyMdType;
