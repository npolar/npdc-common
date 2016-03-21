'use strict';

var collectionDirective = function() {
  'ngInject';

  return {
    scope: {
       collection: '='
    },
    template: require('./collection.html'),
  };
};


module.exports = collectionDirective;
