'use strict';

// @ngInject
let autocompleteDirective = function () {
  return {
    controller: 'NpdcAutocompleteController',
    require: '?^^npdcExpandSearch',
    template: require('./autocomplete.html'),
    link(scope, elem, attrs, ctrl) {
      if (ctrl) {
        scope.expandSearch = true;
      }
    }
  };
};

module.exports = autocompleteDirective;
