"use strict";

let Chronopic = require('chronopic');
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
    link: function(scope, elem, attrs) {
      let options = chronopicService.getOptions(scope.field.path);
      let onChange = options.onChange;
      delete options.onChange;

      // Try parsing any pre-existing value as a date
      if (!(options.date instanceof Date)) {
        let date = new Date(Date.parse(scope.field.value));
        options.date = isNaN(date) ? null : date;
      }

      // CSS Overrides
      if (typeof options.css === "object") {
        Object.keys(options.css).forEach(key => {
          elem.css(key, options.css[key]);
        });
      }

      // Inject Chronopic instance on element
      new Chronopic(elem[0], Object.assign({
        className: 'chronopic.chronopic-ext-md',
        onChange: function(elem, date) {
          console.log('onChange!', elem, date);
          $timeout(() => {
            let internalFormat = date.toISOString(); // ISO-8601

            if (scope.field.format === "date") {
              internalFormat = internalFormat.slice(0, 10); // yyyy-mm-dd
            }

            scope.field.value = internalFormat;

            if (typeof onChange === "function") {
              onChange(elem, date, scope);
            }
          });
        }
      }, options));
    }
  };
});
