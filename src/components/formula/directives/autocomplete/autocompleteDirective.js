'use strict';

let autocompleteDirective = function () {
  'ngInject';

  return {
    template: require('./autocomplete.html'),
    scope: false
  };
};

module.exports = autocompleteDirective;
