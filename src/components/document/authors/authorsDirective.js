'use strict';

// @ngInject
var authorsDirective = function() {
  return {
    scope: {
      authors: '='
    },
    template: require('./authorstemplate.html')
  };
};


module.exports = authorsDirective;
