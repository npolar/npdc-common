'use strict';

// @ngInject
var SearchController = function ($scope, $location, NpolarApiSecurity) {
  
  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;
  
  // Simplify facet array to facet object
  $scope.facet = function(farr) {
    let keys = Object.keys(farr);
    let key = keys[0];
    let facet = farr[key].map(f => {
      
      f.facet = key;
      return f;
    
    });
    
    return facet;
    
  };
  
  
};

module.exports = SearchController;