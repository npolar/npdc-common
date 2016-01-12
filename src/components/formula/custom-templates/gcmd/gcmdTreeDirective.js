'use strict';

/**
 * @ngInject
 */
var gcmdTree = function() {

  return {
    template: require('./gcmdTree.html'),
    scope: {
      tree: '=',
      filter: '='
    },
    priority: -1
  };
};

module.exports = gcmdTree;
