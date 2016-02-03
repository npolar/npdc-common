'use strict';
// Organisations directive

var organisationsDirective = function() {
  'ngInject';
  
  return {
    template: require('./organisations.html')
  };
};

module.exports = organisationsDirective;
