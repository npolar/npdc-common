'use strict';
// Top: citation directive

var citationDirective = function() {
  'ngInject';
  
  return {
    scope: {
      citation: '='
    },
    template: require('./citationtemplate.html'),
  };
};


module.exports = citationDirective;
