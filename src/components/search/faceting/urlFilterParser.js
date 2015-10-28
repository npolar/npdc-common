'use strict';

const FILTER_PARAM_REQEX = /^filter-(.*)/;


let parseUrl = function($scope, filters, query) {
  let parseRangeFilter = function(facet, terms) {
    let range = terms[0].split('..');
    // @FIXME doesn't support day/month (0 for year part)
    let termParts = [range[0].split('-')[0], range[1].split('-')[0]];

    if (!filters.array.some(filter => filters.equals(filter, {
        term: termParts[0] + '..' + termParts[1],
        facet: facet.key
      }))) {
      facet.slider.min = facet.slider.floor = termParts[0];
      facet.slider.max = facet.slider.ceil = termParts[1];
      filters.addRangeFilter(facet);
    }
  };


  if (query) {
    Object.keys(query).forEach((key) => {
      let matches = FILTER_PARAM_REQEX.exec(key);
      if (matches) {
        let key_reqex = new RegExp(`^((day|month|year)-)?${matches[1]}$`);
        let facet = $scope.model.find((facet) => key_reqex.test(facet.key));
        let terms = query[key].split(',');
        if (facet) {
          let item = facet[facet.key].find(item => item.term === terms[0]);
          if (facet.uiType === 'range') {
            parseRangeFilter(facet, terms);
          } else if (facet.uiType === 'checkbox' && item) {
            item.selected = true;
            filters.add(item);
          } else {
            terms.forEach(term => {
              let item = facet[facet.key].find(item => item.term === term);
              filters.add(item);
            });
          }
        }
      }
    });
  }
};

module.exports = {
  parseUrl
};
