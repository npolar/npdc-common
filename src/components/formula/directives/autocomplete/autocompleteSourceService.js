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

    $q.all([resource.facets({ facets, q: '' }).$promise, formula.getFields()]).then(responses => {
      autocompleteFacets.forEach(facet => {
        let item = responses[0].find(r => r.facet === facet);
        let nodes = item.facet.split('.');
        let field = responses[1].find(field => {
          let parts = nodes.slice();

          return field.id === parts.pop() &&
            field.parents.map(p => p.id).filter(p => !/_item/.test(p))
            .every(p => p === parts.pop());
        });
        if (field.typeOf('array')) {
          nodes.push(field.id + '_item');
        }
        let source = function (q) {
          q = (q || '').toLocaleLowerCase();
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
          let fieldNodes = field.path.replace(/^#\//, '').replace(/\/\d$/, '/'+field.id).split('/');
          return angular.equals(nodes, fieldNodes);
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
