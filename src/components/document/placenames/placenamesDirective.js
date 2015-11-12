'use strict';
// placenames directive

// @ngInject
var placenamesDirective = function() {
  return {
    template: require('./placenames.html')
  };
};

module.exports = placenamesDirective;
