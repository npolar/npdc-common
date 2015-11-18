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
        return authors.reduce((m, a, i) => {
          return m +
            (a.first_name ? a.first_name + ' ' + a.last_name : a.name) +
            (i < authors.length-1 ? ', ':'');
        }, '');
      };
    }
  };
};


module.exports = authorsDirective;
