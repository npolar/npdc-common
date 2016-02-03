'use strict';

let autocompleteDirective = function () {
  'ngInject';

  return {
    controller: 'NpdcAutocompleteController',
    require: '?^^npdcExpandSearch',
    template: require('./autocomplete.html'),
    scope: {
      options: '='
    },
    link(scope, elem, attrs, ctrl) {
      if (ctrl) {
        scope.expandSearch = true;
      }
    }
  };
};

module.exports = autocompleteDirective;
