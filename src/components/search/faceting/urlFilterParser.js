'use strict';

const FILTER_PARAM_REQEX = /^filter-(.*)/;
const RANGE_SEPARATOR = '..';


let parseUrl = function($scope, filters, query) {
  let parseRangeFilter = function(facet, terms) {
    let range = terms[0].split(RANGE_SEPARATOR);
    let min = parseInt(range[0].split('-')[0]);
    let max = parseInt(range[1].split('-')[0]) - 1; // 2010-01-01 -> facet term 2009

    if (!filters.array.some(filter => filters.equals(filter, {
        term: min + '..' + max,
        facet: facet.key
      }))) {
        if (facet.slider) {
          facet.slider.min = Math.max(min, facet.slider.floor);
          facet.slider.max = Math.min(max, facet.slider.ceil);
        } else {
          facet.slider = {
            min,
            max
          };
        }
      filters.addRangeFilter(facet);
    }
  };


  if (query) {
    Object.keys(query).forEach((key) => {
      let matches = FILTER_PARAM_REQEX.exec(key);
      if (matches) {
        let key_reqex = new RegExp(`^(year-)?${matches[1]}$`);
        let facet = $scope.options.facets.find(f => key_reqex.test(Object.keys(f)[0]));
        let terms = query[key].split(',');
        if (facet) {
          facet.key = Object.keys(facet)[0];
          let item = facet[facet.key].find(item => item.term === terms[0]);
          if (item) {
            item.facet = facet.key;
          }
          if (facet.uiType === 'range' || query[key].includes(RANGE_SEPARATOR)) {
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
