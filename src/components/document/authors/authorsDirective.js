'use strict';
let authorsDirective = function() {
  'ngInject';

  return {
    scope: {
      authors: '=',
      config: '=?'
    },
    template: require('./authorstemplate.html'),
    controller: function($scope) {
      'ngInject';
      
      let self = this;
      
      $scope.authors = ($scope.authors||[]).map(a => {
      
        if (a && a.last_name) {  
          a.name = `${a.first_name||''} ${a.last_name}`.trim();
        }
        return a;
      });
      
      $scope.isNpolar = function(o) {
        return ((/npolar\.no|NPI|Norsk Polarinstitutt|Norwegian Polar Institute/i).test(o));
      };
      
    }
  };
};


module.exports = authorsDirective;