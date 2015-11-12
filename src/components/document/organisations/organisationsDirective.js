'use strict';
// Organisations directive

// @ngInject
var organisationsDirective = function() {
  return {
    template: require('./organisations.html')
  };
};

module.exports = organisationsDirective;
