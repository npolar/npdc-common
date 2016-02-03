'use strict';
// Person directive

var personsDirective = function() {
  'ngInject';
  
  return {
    template: require('./personstemplate.html'),
  };
};

module.exports = personsDirective;
