'use strict';

// @ngInject
let SearchConfigFactory = function($location) {
  let results = {};
  let filterUi = {
      'year-released': {
        type: 'range'
      }
    };

  let constructor = function (options) {
    return Object.assign({
      results,
      filterUi,
    }, options);
  };

  return constructor;
};

module.exports = SearchConfigFactory;
