'use strict';

let SearchConfigFactory = function($location, NpolarTranslate) {
  'ngInject';

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
  let placeholder = NpolarTranslate.translate('search');

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
