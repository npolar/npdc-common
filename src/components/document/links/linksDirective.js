'use strict';

var linkDirective = function() {
  'ngInject';

  return {
    scope: {
      links: '=',
      related: '='
    },
    template: require('./linkstemplate.html'),
    controller($scope) {
      'ngInject';

      $scope.isEmpty = function(related) {
        return !!related && !related.some(collection => collection.length > 0);
      };
    }
  };
};


module.exports = linkDirective;
