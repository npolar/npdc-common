'use strict';

// @ngInject
let autocompleteDirective = function () {
  return {
    controller: 'NpdcAutocompleteController',
    template: require('./autocomplete.html')
  };
};

module.exports = autocompleteDirective;
