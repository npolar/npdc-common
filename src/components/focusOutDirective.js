'use strict';

module.exports = function($timeout, $rootScope, $parse) {
  'ngInject';

  return {
    restrict: 'A',
    compile: function($element, attr) {
      var fn = $parse(attr.ngFocusOut);
      return function ngEventHandler(scope, element) {
        element.on('focusout', function(event) {
          var callback = function() {
            fn(scope, {
              $event: event
            });
          };
          if ($rootScope.$$phase) {
            scope.$evalAsync(callback);
          } else {
            scope.$apply(callback);
          }
        });
      };
    }
  };
};
