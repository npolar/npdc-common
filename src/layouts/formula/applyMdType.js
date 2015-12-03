'use strict';

// @ngInject
let applyMdType = function() {

  let isNumberRange = function(field) {
    return field.typeOf('range');
  };

  let isNormalInput = function(field) {
    return ['integer', 'number', 'string'].indexOf(field.schema.type) !== -1;
  };

  let isFile = function (field) {
    return field.typeOf('file'); // || field.schema.id.test(/\/file\//);
  };

  let hasSubFields = function(field) {
    return field.fields instanceof Array;
  };

  let setMdType = function(field) {
    field.mdType = field.schema.type;
    if (isNumberRange(field)) {
      field.mdType = 'range';
    } else if (field.typeOf('select')) {
      field.mdType = 'select';
    } else if (isFile(field)) {
      field.mdType = 'file';
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
