'use strict';

var gcmdService = function ($q, NpolarApiResource) {
  'ngInject';

  let GCMD = NpolarApiResource.resource({ path: '/gcmd/concept', resource: 'GCMD' });
  let query = {
    'filter-concept': 'sciencekeywords',
    'fields': 'id,label,child_ids,cardinality',
    'variant': 'array',
    'limit': 'all'
  };

  let isBranch = function() {
    return this.children && this.children.length > 0;
  };

  let buildTree = function (currentLevel, cardinality, parent, source) {
    return currentLevel.map(item => {
      item.parent = parent;
      item.isBranch = isBranch;

      if (item.child_ids && source[cardinality]) {
        let filteredChildLevel = source[cardinality].filter(child => item.child_ids.indexOf(child.id) !== -1);
        item.children = buildTree(filteredChildLevel, cardinality + 1, item, source);
      }
      return item;
    });
  };

  let deferred = $q.defer();

  GCMD.array(query, response => {
    let source = [response.filter(item => item.cardinality === 1),
      response.filter(item => item.cardinality === 2),
      response.filter(item => item.cardinality === 3),
      response.filter(item => item.cardinality === 4),
      response.filter(item => item.cardinality === 5),
      response.filter(item => item.cardinality === 6),
      response.filter(item => item.cardinality === 7)
    ];
    let tree = buildTree(source[0], 1, null, source);
    deferred.resolve(tree);
  }, err => { deferred.reject(); });

  return {
    tree : deferred.promise
  };
};

module.exports = gcmdService;
