'use strict';

// @ngInject
let initMdField = function () {

  const FILE_SCHEME_REGEX = /\/_schema\/ref\/file\//;

  let isNumberRange = function (field) {
    return field.typeOf('range');
  };

  let isNormalInput = function (field) {
    return ['integer', 'number', 'string'].indexOf(field.schema.type) !== -1;
  };

  let isAutoComplete = function (field) {
    return field.typeOf("autocomplete");
  };

  let isFile = function (field) {
    return field.format === 'file-uri' || (field.schema &&
      (FILE_SCHEME_REGEX.test(field.schema.id) ||
        (field.schema.items && FILE_SCHEME_REGEX.test(field.schema.items.id))
      ));

  };

  let isFileArray = function (field) {
    return field.fields && isFile(field);
  };

  let isDate = function (field) {
    return field.typeOf('date') || field.typeOf('datetime');
  };

  let hasSubFields = function (field) {
    return field.fields instanceof Array;
  };

  let setMdType = function (field) {
    field.mdType = field.schema.type;
    if (isNumberRange(field)) {
      field.mdType = 'range';
    } else if (field.typeOf('select')) {
      field.mdType = 'select';
    } else if (isDate(field)) {
      field.mdType = 'date';
    } else if (isFile(field)) {
      field.mdType = 'file';
      field.readonly = true;
    } else if (isAutoComplete(field)) {
      field.mdType = 'autocomplete';
    } else if (isNormalInput(field)) {
      field.mdType = 'input';
    } else if (isFileArray(field)) {
      field.mdType = 'fileArray';
    } else if (hasSubFields(field)) {
      field.fields.forEach(item => {
        setMdType(item);
      });
    }
  };

  return {
    restrict: 'A',
    require: '^formula',
    scope: {
      field: '=initMdField'
    },
    // @ngInject
    controller ($scope) {
      let field = $scope.field;
      setMdType(field);
    }
  };
};

module.exports = initMdField;
