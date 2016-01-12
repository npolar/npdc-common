'use strict';

/**
 * @ngInject
 */
var gcmdTreeItem = function($compile) {

  return {
    template: require('./gcmdTreeItem.html'),
    scope: true,
    link: function(scope, element, attrs) {

      scope.toggle = function(item) {
        item.children.visible = !item.children.visible;
      };

      scope.select = function (item) {
        scope.$emit('gcmd-select', item);
      };

      if (scope.item.isBranch()) {
        $compile('<npdc:formula-gcmd-tree tree="item.children" filter="filter"></npdc:formula-gcmd-tree>')(scope, function(cloned, scope) {
          element.append(cloned);
        });
      }
    }
  };
};

module.exports = gcmdTreeItem;
