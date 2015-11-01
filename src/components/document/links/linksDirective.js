'use strict';
// Organisation directive

// @ngInject
var linkDirective = function() {
  return {
    template: require('./linkstemplate.html'),
    scope: {
      links: "=",
      related: "="
    }
  };
};


module.exports = linkDirective;
