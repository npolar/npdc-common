'use strict';

// @ngInject
var linkDirective = function() {
  return {
    scope: {
      links: '=',
      related: '='
    },
    template: require('./linkstemplate.html')
  };
};


module.exports = linkDirective;
