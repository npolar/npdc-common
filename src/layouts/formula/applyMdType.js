'use strict';

// @ngInject
let applyMdType = function(FileFunnelService) {

  let isNumberRange = function(field) {
    return field.typeOf('range');
  };

  let isNormalInput = function(field) {
    return ['integer', 'number', 'string'].indexOf(field.schema.type) !== -1;
  };

  let isFile = function(field) {
    return field.format === 'file-uri' ||
      (field.schema.items && /\/_schema\/ref\/file\//.test(field.schema.items.id));
  };

  let isFileArray = function(field) {
    return field.fields && isFile(field);
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
      field.disabled = true;
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
    require: ['^formula'],
    scope: {
      field: '=applyMdType'
    },
    link: function(scope, element, attrs, controller) {
      setMdType(scope.field);

      if (isFileArray(scope.field)) {
        let oldItemAdd = scope.field.itemAdd;
        scope.field.itemAdd = function(ev) {
          FileFunnelService.showUpload(ev, {multiple: true}).then(files => {
            files.forEach(file => {
              if (file.status !== FileFunnelService.status.COMPLETED) {
                return;
              }
              let newItem = oldItemAdd.call(scope.field);
              newItem.fields.forEach(field => {
                switch (field.id) {
                  case 'uri':
                    field.value = FileFunnelService.options.server + file.location;
                    break;
                  case 'filename':
                    field.value = file.reference.name;
                    break;
                  case 'filesize':
                    field.value = file.reference.size;
                    break;
                  case 'mimetype':
                    field.value = file.reference.type;
                    break;
                  default:
                    // noop
                }
                field.readonly = true;
              });
            });
          });
        };
      }
    }
  };
};

module.exports = applyMdType;
