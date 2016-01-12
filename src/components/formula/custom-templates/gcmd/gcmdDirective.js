'use strict';

/**
 * @ngInject
 */
let gcmd = function(formulaAutoCompleteService, npdcGcmdService) {

  const FIELDS = ['Category', 'Topic', 'Term', 'Variable_Level_1', 'Variable_Level_2', 'Variable_Level_3'];

  let setFieldValue = function (fieldset, item) {
    let key = FIELDS[item.cardinality - 1];
    let field = fieldset.fields.find(field => field.id === key);
    field.value = item.label;
    if (item.parent) {
      setFieldValue(fieldset, item.parent);
    }
  };

  let matchQuery = function (item, query) {
    return item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  };

  let filterTree = function (tree, query) {
    tree.forEach(item => {
      let hasChildren = false;
      if (item.isBranch()) {
        filterTree(item.children, query);
        hasChildren = item.children.visible;
      }

      if (matchQuery(item, query) || hasChildren) {
        item.visible = true;
        tree.visible = true;
      } else {
        item.visible = false;
      }
    });
  };

  return {
    template: require('./gcmd.html'),
    //@ngInject
    controller($scope) {
      $scope.keywords = $scope.field.fields.find(field => field.id === 'sciencekeywords');
      $scope.locations = $scope.field.fields.find(field => field.id === 'locations');
      $scope.filter = {
        text: ''
      };

      $scope.filterTree = function (value) {
        if (!value || value.length < 4) {
          return;
        }
        filterTree($scope.tree, value);
      };

      npdcGcmdService.tree.then(t => {
        $scope.tree = t;
      });

      $scope.$on('gcmd-select', (event, item) => {
        if (item.selected) {
          let keyword = $scope.keywords.itemAdd();
          keyword.gcmdItem = item.id;
          setFieldValue(keyword, item);
        } else {
          let keyword = $scope.keywords.values.find(value => value.gcmdItem === item.id);
          $scope.keywords.itemRemove(keyword.index);
        }
      });
    }
  };
};

module.exports = gcmd;
