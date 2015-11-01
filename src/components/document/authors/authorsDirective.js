'use strict';

// @ngInject
var authorsDirective = function() {
  return {
    template: require('./authorstemplate.html'),
  };
};


module.exports = authorsDirective;
