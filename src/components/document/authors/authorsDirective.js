'use strict';
let authorsDirective = function() {
  'ngInject';

  return {
    scope: {
      authors: '=',
      icon: '@?',
      people: '=?' // may include or exclude authors
    },
    template: require('./authorstemplate.html'),
    controller: 'NpdcAuthorsController',
    controllerAs: 'ctrl'
  };
};


module.exports = authorsDirective;