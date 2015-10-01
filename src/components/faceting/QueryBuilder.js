'use strict';

const QueryBuilder = function () {
  let build = function (q, filters) {
    let query = {
      q: q || ''
    };

    filters.array.forEach(filter => {
      let val = query['filter-'+filter.facet] ? query['filter-'+filter.facet] + ',' : '';
      query['filter-'+filter.facet] = val + filter.term;
    });

    return query;
  };

  return {
    build
  };
};

module.exports = QueryBuilder;
