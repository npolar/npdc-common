'use strict';

var metaDirective = function() {
  'ngInject';
  
  return {
    template: require('./metatemplate.html')
  };
};


module.exports = metaDirective;
