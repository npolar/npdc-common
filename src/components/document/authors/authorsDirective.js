'use strict';

var authorsDirective = function() {
  'ngInject';

  return {
    scope: {
      authors: '='
    },
    template: require('./authorstemplate.html'),
    controller: function($scope) {
      'ngInject';
      
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
