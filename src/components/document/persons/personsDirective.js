'use strict';
// Person directive

// @ngInject
var personsDirective = function() {
  return {
    template: require('./personstemplate.html'),
  };
};

module.exports = personsDirective;
