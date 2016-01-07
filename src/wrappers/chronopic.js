"use strict";

let Chronopic = require('chronopic/src/chronopic.js');
let angular = require('angular');
require('chronopic/dist/js/chronopic-i18n.min.js');

let cp = angular.module('chronopic', []);

cp.service('chronopicService', function() {
  const DEFAULTS = {
    date: null,
    format: "{date}"
  };
  let opts = {};

  let defineOptions = function (key, options) {
    opts[key] = Object.assign({}, DEFAULTS, options);
  };

  let getOptions = function (key) {
    return opts[key] || DEFAULTS;
  };

  return {
    defineOptions,
    getOptions
  };
});

cp.directive('chronopic', function($timeout, chronopicService) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attrs, model) {
      let options = chronopicService.getOptions(scope.field.path);
      let onChange = options.onChange, cp;
      delete options.onChange;

      let parseDate = function (date) {
        // Try parsing any pre-existing value as a date
        if (!(date instanceof Date)) {
          let newDate = new Date(Date.parse(date));
          return isNaN(newDate) ? null : newDate;
        }
        return null;
      };

      options.date = parseDate(scope.field.value);
      options.format = `{${scope.field.format.replace('-', '')}}`;

      // CSS Overrides
      if (typeof options.css === "object") {
        Object.keys(options.css).forEach(key => {
          elem.css(key, options.css[key]);
        });
      }

      scope.$watch('field.value', function (n,o) {
        if (n && n !== o) {
          let date = parseDate(n);
          if (date) {
            cp.instances[0].date = date;
            cp.instances[0].update();
          }
        }
      });

      // Inject Chronopic instance on element
      cp = new Chronopic(elem[0], Object.assign({
        className: 'chronopic.chronopic-ext-md',
        onChange: function(elem, date) {
          $timeout(() => {
            let internalFormat = date.toISOString(); // ISO-8601

            if (scope.field.format === "date") {
              internalFormat = internalFormat.slice(0, 10); // yyyy-mm-dd
            }

            model.$viewValue = scope.field.value = internalFormat;

            if (typeof onChange === "function") {
              onChange(elem, date, scope);
            }
          });
        }
      }, options));
    }
  };
});
