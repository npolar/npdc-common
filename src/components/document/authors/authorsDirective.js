'use strict';
let authorsDirective = function() {
  'ngInject';

  return {
    scope: {
      authors: '=',
      people: '=?' // may include or exclude authors
    },
    template: require('./authorstemplate.html'),
    controller: 'NpdcAuthorsController'
  };
};


module.exports = authorsDirective;