'use strict';

// @ngInject
let SearchConfigFactory = function($location) {
  let results = {
    avatar: undefined,
    title: undefined,
    subtitle: undefined,
    detail: undefined
  };
  let filterUi = {
      'year-released': {
        type: 'range' // 'autocomplete', 'checkbox', 'hidden'
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
