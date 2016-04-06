"use strict";
let angular = require('angular');

let autocompleteSourceService = function($q, formulaFieldConfig) {
  'ngInject';

  let configs = formulaFieldConfig.getInstance();

  let getOptions = function (field) {
    return configs.getMatchingConfig(field);
  };

  let autocomplete = function (config, formula) {
    configs.addConfig(config);
    if (formula) {
      formula.addTemplate({
        match: config.match,
        template: '<npdc:formula-autocomplete></npdc:formula-autocomplete>'
      });
    }
  };

  let autocompleteFacets = function (autocompleteFacets, resource, formula) {
    let facets = autocompleteFacets.join(',');

    resource.facets({ facets, q: '' }, facets => {
      autocompleteFacets.forEach(facet => {
        let item = facets.find(r => r.facet === facet);
        let nodes = item.facet.split('.');

        let source = function (q) {
          q = String(q || '').toLocaleLowerCase();
          return item.terms.map(t => String(t.term))
            .filter(item => item.toLocaleLowerCase().indexOf(q) !== -1)
            .sort((a, b) => {
              let aIndex = a.toLocaleLowerCase().indexOf(q);
              let bIndex = b.toLocaleLowerCase().indexOf(q);
              if (aIndex < bIndex) {
                return -1;
              } else if (aIndex > bIndex) {
                return 1;
              }
              return 0;
            });
        };

        let match = function(field) {
          let fieldNodes = field.path.replace(/^#\//, '').replace(/\/\d+/g, '').split('/');
          return !field.typeOf('array') && angular.equals(nodes, fieldNodes);
        };
        autocomplete({
          match,
          querySource: source
        }, formula);

      });
    });
  };

  return {
    autocomplete,
    getOptions,
    autocompleteFacets
  };
};

module.exports = autocompleteSourceService;
