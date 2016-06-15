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
      
      $scope.authors = $scope.authors.map(a => {
        if (!a.name && a.last_name) {
          a.name = `${a.first_name||''} ${a.last_name}`.trim();
        }
        //delete a.first_name;
        //delete a.last_name;
        return a;
      });
    }
  };
};


module.exports = authorsDirective;
