"use strict";

let autocompleteSourceService = function(formulaFieldConfig) {
  'ngInject';

  let configs = formulaFieldConfig.getInstance();

  let getOptions = function (field) {
    return configs.getMatchingConfig(field);
  };

  let defineOptions = function (config, formula) {
    configs.addConfig(config);
    if (formula) {
      formula.addTemplate({
        match: config.match,
        template: '<npdc:formula-autocomplete></npdc:formula-autocomplete>'
      });
    }
  };

  let optionsFromFacets = function (autocompleteFacets, resource, formula) {
    let facets = autocompleteFacets.join(',');

    resource.facets({ facets, q: '' }, response => {
      let relevant = response.filter(item => autocompleteFacets.includes(item.facet));
      relevant.forEach(item => {
        let nodes = item.facet.split('.');
        let id = nodes.pop();
        let source = () => item.terms.map(t => t.term);
        let match = function(field) {
          console.log(field.path);
          let fieldNodes = field.path.replace(/(#\/|\/\d)/g, '').split('/');
          fieldNodes.pop();
          return field.id === id && fieldNodes.every((parent, index) => {
            return parent === nodes[index];
          });
        };
        defineOptions({
          match,
          querySource: source
        }, formula);
      });
    });
  };

  return {
    defineOptions,
    getOptions,
    optionsFromFacets
  };
};

module.exports = autocompleteSourceService;
