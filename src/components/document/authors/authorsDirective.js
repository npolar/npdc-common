'use strict';
let authorsDirective = function($location, $anchorScroll) {
  'ngInject';

  return {
    scope: {
      authors: '='
    },
    template: require('./authorstemplate.html'),
    controller: function($scope) {
      'ngInject';
      
      $scope.authors = ($scope.authors||[]).map(a => {
        if (a && a.last_name) {  
          a.name = `${a.first_name||''} ${a.last_name}`.trim();
        }
        return a;
      });
      
      $scope.isNpolar = function(o) {
        return ((/npolar\.no|NPI|Norsk Polarinstitutt|Norwegian Polar Institute/i).test(o));
      };
      
      $scope.hasRole = (person, role) => {
        if (!person || !person.roles.length || !role) { return; }
        return person.roles.includes(role);
      };
      
      $scope.gotoPerson = (person) => {
        if (!person) { return; }
        let anchor = `${person.first_name}+${person.last_name}`.toLowerCase();
        $location.hash(anchor);
        $anchorScroll();
      
      };
    }
  };
};


module.exports = authorsDirective;