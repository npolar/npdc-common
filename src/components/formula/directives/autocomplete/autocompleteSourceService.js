"use strict";

let autocompleteSourceService = function(formulaFieldConfig) {
  'ngInject';

  let configs = formulaFieldConfig.getInstance();

  let getOptions = function (field) {
    return configs.getMatchingConfig(field);
  };

  let defineOptions = function (config) {
    configs.addConfig(config);
  };

  return {
    defineOptions,
    getOptions
  };
};

module.exports = autocompleteSourceService;
