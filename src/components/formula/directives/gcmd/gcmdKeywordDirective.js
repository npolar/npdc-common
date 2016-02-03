'use strict';

let gcmd = function(npdcGcmdService) {
  'ngInject';

  const FIELDS = ['Category', 'Topic', 'Term', 'Variable_Level_1', 'Variable_Level_2', 'Variable_Level_3', 'Detailed_Variable'];

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

  let searchTree = function (tree, query) {
    let matches = [];
    tree.forEach(item => {
      if (item.isBranch()) {
        matches = matches.concat(searchTree(item.children, query));
      }

      if (matchQuery(item, query)) {
        matches.push(item);
      }
    });
    return matches;
  };

  return {
    template: require('./gcmdKeyword.html'),
    controller($scope) {
      'ngInject';

      $scope.keyword = $scope.field.fields.reduce((memo, field) => {
        memo[field.id] = field;
        return memo;
      }, {});

      $scope.filter = {
        text: ''
      };

      $scope.querySearch = function (value) {
        return searchTree($scope.tree, value);
      };

      $scope.parents = function (item) {
        let parents = '';
        if (item.parent) {
          let grandParents = $scope.parents(item.parent);
          parents += grandParents ? grandParents + ' > ' : '';
          parents += item.parent.label;
        }
        return parents;
      };

      /* jshint -W083 */
      $scope.treeValues = function (cardinality) {
        let i = 0;
        let level = $scope.tree;
        // get selected parent from top of tree and down to {cardinality}
        while (i < (cardinality - 1)) {
          let key = FIELDS[i];
          let field = $scope.keyword[key];
          if (field.value) {
            let selectedItem = level.find(item => item.label === field.value);
            level = selectedItem.children;
            i++;
          } else {
            return [];
          }
        }

        return level;
      };

      $scope.onSelect = function (item) {
        let key = FIELDS[item.cardinality - 1];
        let field = $scope.keyword[key];
        field.value = item.label;
        if (item.parent) {
          $scope.onSelect(item.parent);
        }
      };

      npdcGcmdService.tree.then(t => {
        $scope.tree = t;
      });
    }
  };
};

module.exports = gcmd;
