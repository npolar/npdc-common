'use strict';
// Top: citation directive

// @ngInject
var citationDirective = function() {
  return {
    scope: {
      citation: '='
    },
    template: require('./citationtemplate.html'),
  };
};


module.exports = citationDirective;
