'use strict';
// placenames directive

var placenamesDirective = function() {
  'ngInject';
  
  return {
    template: require('./placenames.html')
  };
};

module.exports = placenamesDirective;
