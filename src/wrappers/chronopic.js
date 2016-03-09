"use strict";

let Chronopic = require('chronopic.js/src/chronopic.js');
let angular = require('angular');
require('chronopic.js/dist/js/chronopic-i18n.min.js');

let cp = angular.module('chronopic', []);

cp.service('chronopicService', function(formulaFieldConfig) {

  let configs = formulaFieldConfig.getInstance();

  let defineOptions = function (config) {
    configs.addConfig(config);
  };

  let getOptions = function (field) {
    return configs.getMatchingConfig(field);
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

      let tabContainer = document.body.querySelector(".formula .np-formula-tab");
      let options = chronopicService.getOptions(scope.field) || {};
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
        monthYearOnly: (scope.field.format === "year-month"),
        min: { year: 1400 },
        max: { year: 2200 },
        onChange: function(elem, date) {
          $timeout(() => {
            let internalFormat = date.toISOString(); // ISO-8601

            switch(scope.field.format) {
            case "date":
              internalFormat = internalFormat.slice(0, 10); // yyyy-mm-dd
              break;

            case "year-month":
              internalFormat = internalFormat.slice(0, 7); // yyyy-mm
              break;
            }

            model.$viewValue = scope.field.value = internalFormat;

            if (typeof onChange === "function") {
              onChange(elem, date, scope);
            }
          });
        }
      }, options));

      scope.$on('npolar-lang', (e, lang) => {
          cp.locale = lang.lang;
      });

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
