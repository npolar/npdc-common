'use strict';

// @ngInject
var linkDirective = function() {
  return {
    scope: {
      links: '=',
      related: '='
    },
    template: require('./linkstemplate.html'),
    //@ngInject
    controller($scope) {
      $scope.title = function (collection) {
        var str = collection[0].collection;
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      $scope.isEmpty = function(related) {
        return !!related && !related.some(collection => collection.length > 0);
      };
    }
  };
};


module.exports = linkDirective;
