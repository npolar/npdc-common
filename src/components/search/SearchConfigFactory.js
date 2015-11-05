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
  let placeholder = 'Search';

  let constructor = function (options) {
    return Object.assign({
      results,
      filterUi,
      placeholder
    }, options);
  };

  return constructor;
};

module.exports = SearchConfigFactory;
