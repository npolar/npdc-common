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
        let fields = responses[1].filter(field => {
          let parts = nodes.slice();

          return field.id === parts.pop() &&
            field.parents.map(p => p.id).filter(p => !/_item/.test(p))
            .every(p => p === parts.pop());
        });
        if (!fields.length) {
          console.error("No field matching facet " + facet);
          return;
        }
        console.log('Found fields', JSON.stringify(fields.map(f => f.path)), 'for', facet);
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

        fields.forEach(field => {
          let fNodes = nodes.slice();
          if (field.typeOf('array')) {
            fNodes.push(field.id + '_item');
          }
          let match = function(field) {
            let fieldNodes = field.path.replace(/^#\//, '').replace(/\/\d$/, '/'+field.id).replace(/\/\d+\//g, '').split('/');
            console.log('adding matching fn', fNodes, fieldNodes);
            return angular.equals(fNodes, fieldNodes);
          };
          autocomplete({
            match,
            querySource: source
          }, formula);
        });

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
