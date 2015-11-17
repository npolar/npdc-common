'use strict';

// @ngInject
var authorsDirective = function() {
  return {
    scope: {
      authors: '='
    },
    template: require('./authorstemplate.html'),
    //@ngInject
    controller: function($scope) {
      $scope.fullnames = function (authors) {
        return authors.reduce((m, a, i) => m + a.first_name + ' ' + a.last_name + (i < authors.length-1 ? ', ':''), '');
      };
    }
  };
};


module.exports = authorsDirective;
