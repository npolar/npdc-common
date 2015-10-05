'use strict';

const QueryBuilder = function () {
  let filterKey = function (facet) {
    return 'filter-' + facet.replace(/^(year|day|month)-/, '');
  };

  let build = function (q, filters) {
    let query = {
      q: q || ''
    };

    filters.forEach(filter => {
      let key = filterKey(filter.facet);
      let val = query[key] ? query[key] + ',' : '';
      query[key] = val + filter.term;
    });

    return query;
  };

  return {
    build
  };
};

module.exports = QueryBuilder;
