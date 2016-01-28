'use strict';

// @ngInject
let initMdField = function () {

  let isNumberRange = function (field) {
    return field.typeOf('range');
  };

  let isNormalInput = function (field) {
    return ['integer', 'number', 'string'].indexOf(field.mainType) !== -1;
  };

  let isDate = function (field) {
    return field.typeOf('date') || field.typeOf('datetime');
  };

  let setMdType = function (field) {
    field.mdType = field.mainType;
    if (isNumberRange(field)) {
      field.mdType = 'range';
    } else if (field.typeOf('select')) {
      field.mdType = 'select';
    } else if (isDate(field)) {
      field.mdType = 'date';
    } else if (isNormalInput(field)) {
      field.mdType = 'input';
    }
  };

  return {
    restrict: 'A',
    require: '^formula',
    priority: -1,
    scope: false,
    // @ngInject
    controller ($scope) {
      setMdType($scope.field);
    }
  };
};

module.exports = initMdField;
