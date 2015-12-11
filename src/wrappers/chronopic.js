"use strict";

let Chronopic = require('chronopic');
let angular = require('angular');
require('chronopic/dist/js/chronopic-i18n.min.js');

let cp = angular.module('chronopic', []);

cp.service('ChronopicService', function() {
  let options = {
    date: null,
    format: "{date}"
  };

  return {
    options
  };
});

cp.directive('chronopic', function($timeout, ChronopicService) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      let options = ChronopicService.options;

      // Try parsing any pre-existing value as a date
      let parsedDate = (options.date instanceof Date ?
        options.date : new Date(Date.parse(scope.field.value)));

      // CSS Overrides
      if (typeof options.css === "object") {
        Object.keys(options.css).forEach(key => {
          elem.css(key, options.css[key]);
        });
      }

      // Inject Chronopic instance on element
      new Chronopic(elem[0], {
        date: isNaN(parsedDate) ? null : parsedDate,
        format: (typeof options.format === "string" ? options.format : null),
        className: 'chronopic.chronopic-ext-md',
        onChange: function(elem, date) {
          $timeout(() => {
            let internalFormat = date.toISOString(); // ISO-8601

            if (scope.field.format === "date") {
              internalFormat = internalFormat.slice(0, 10); // yyyy-mm-dd
            }

            scope.field.value = internalFormat;

            if (typeof options.onChange === "function") {
              options.onChange(elem, date, scope);
            }
          });
        }
      });
    }
  };
});
