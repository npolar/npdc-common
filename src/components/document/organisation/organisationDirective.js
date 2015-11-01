'use strict';
// Organisation directive

// @ngInject
var organisationDirective = function() {
  return {
    template: require('./organisationtemplate.html'),
    scope: {
      organisation: "=",
    }
  };
};

module.exports = organisationDirective;
