'use strict';
// Top: citation directive

var citationDirective = function($http) {
  'ngInject';
  
  return {
    scope: {
      citation: '=?',
      citations: '=?'
    },
    template: require('./citation.html'),
    controller: ($scope) => {
      'ngInject';
      $scope = $scope;
      $scope.citation = $scope.citations[0];
      $scope.error = null;
      
      // Use <pre> ? (Not for all as this breaks mobile views)
      $scope.isPreformatted = (citation) => {
        return citation.title === 'RIS';
      };
      
      $scope.citationClicked = function(link) {
        $scope.error = null;
        if (link.text) {
          $scope.citation = link;
        } else if (link.href) {
          $scope.citation = link;
            $http.get(link.href).then(r => {
              $scope.citation.text = r.data;  
          }, (e) => {
            if (404 === e.status) {
              $scope.error = `No ${link.title} citation for this dataset yet`;
              if (dataset.doi) {
                $scope.error += `This is normal for 24 hours after DOI creation`;
              }
            } else {
              $scope.error = `Citation service ${link.href} failed, status: ${e.status}`;  
            }
          });
        }
      };
    }
  };
};


module.exports = citationDirective;
