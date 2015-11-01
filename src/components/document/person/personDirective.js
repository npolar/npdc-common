'use strict';
// Person directive

// @ngInject
var personDirective = function() {
  return {
    template: require('./persontemplate.html'),
    scope: {
      person: "=",
    }
  };
};

module.exports = personDirective;
