"use strict";

let Chronopic = require('chronopic/src/chronopic.js');
let angular = require('angular');
require('chronopic/dist/js/chronopic-i18n.min.js');

let cp = angular.module('chronopic', []);

cp.service('chronopicService', function() {
  let opts = {};

  let defineOptions = function (key, options) {
    opts[key] = Object.assign({}, options);
  };

  let getOptions = function (key) {
    return (opts[key] || {});
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
      if (scope.field.readonly) {
        attrs.$set('readonly', true);
      }
      if (scope.field.disabled) {
        attrs.$set('disabled', true);
      }

      let tabContainer = document.body.querySelector(".formula md-tabs-content-wrapper");
      let options = chronopicService.getOptions(scope.field.path) || chronopicService.getOptions(scope.field.id);
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

      // CSS Overrides
      Object.keys(options.css || {}).forEach(key => {
        elem.css(key, options.css[key]);
      });

      // Inject Chronopic instance on element
      cp = new Chronopic(elem[0], Object.assign({
        className: 'chronopic.chronopic-ext-md',
        container: tabContainer,
        direction: 'auto',
        format: `{${scope.field.format.replace('-', '')}}`,
        monthYearOnly: (scope.field.format === "monthyear"),
        onChange: function(elem, date) {
          $timeout(() => {
            let internalFormat = date.toISOString(); // ISO-8601

            if (scope.field.format !== "date-time") {
              internalFormat = internalFormat.slice(0, 10); // yyyy-mm-dd
            }

            model.$viewValue = scope.field.value = internalFormat;

            if (typeof onChange === "function") {
              onChange(elem, date, scope);
            }
          });
        }
      }, options));

      if(scope.field.value) {
        let date = parseDate(scope.field.value);

        if(date) {
          $timeout(() => {
            cp.instances[0].date = date;
            cp.instances[0].update();
          });
        }
      }
    }
  };
});
