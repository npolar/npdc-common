'use strict';
// Person directive

var personsDirective = function() {
  'ngInject';
  
  return {
    template: require('./persons.html'),
  };
};

module.exports = personsDirective;
