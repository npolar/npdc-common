'use strict';

require('../../main');
require('formula');
var angular = require('angular');

angular
  .module('formulaDemo', ['ngMaterial', 'ngMessages', 'formula'])
  .controller('FormulaCtrl', function DemoCtrl($mdDialog, $scope, $compile) {
    $scope.formulaData = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "template.html"
    };
    $scope.data = [{title: "test1"}, {title: "test2"}];
  //   setTimeout(function() {
  //   Array.prototype.forEach.call(document.querySelectorAll('md-input-container'), function(elem) {
  //     $compile(elem)($scope);
  //     console.log('recompile');
  //   });
  // }, 2000);
  })
  .directive('inner', ['$compile', function ($compile) {
    return {
      restrict: 'A',
			require: [ '^outerouter' ],
			scope: { data: '=inner' },
    	link: function(scope, element, attrs, controller) {
        var data = scope.data;
        attrs.$set('id', data.a);
				attrs.$set('ngModel', 'field.b');
        attrs.$set('inner');
        var elem = angular.element('<input>');
        elem.attr('type', 'text');
        $compile(elem)(scope, function (cloned, scope) {
					element.replaceWith(cloned);
				});
      },
      terminal: true
    };
  }])
  .directive('outer', ['$compile', function ($compile) {
    return {
      restrict: 'A',
			require: '^outerouter',
    	compile: function(element, attrs) {
        attrs.$set('outer');
        return function(scope, element, attrs, controller) {
          // noop
				};
      }
    };
  }])
  .directive('outerouter', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: { data: '=outerouter' },
			controller: ['$scope', '$attrs', '$element', function($scope, $attrs, $element) {
      }]
    };
  }]);
