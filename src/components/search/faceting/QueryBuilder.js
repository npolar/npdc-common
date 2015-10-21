'use strict';

const QueryBuilder = function () {
  const UTC_DATE_PART = '-01-01T00:00:00Z';
  const RANGE_SEPARATOR = '..';

  let filterKey = function (filter) {
    let key = 'filter-';
    if (filter.type === 'date') {
      key += filter.facet.replace(/^(year|day|month)-/, '');
    } else {
      key += filter.facet;
    }
    return key;
  };

  // @TODO need support for month and day
  let filterValue = function (filter) {
    let value = filter.term;
    if (filter.type === 'date') {
      let parts = filter.term.split(RANGE_SEPARATOR);
      value = parts[0] + UTC_DATE_PART + RANGE_SEPARATOR + parts[1] + UTC_DATE_PART;
    }
    return value;
  };

  let build = function (filters) {
    let query = {};

    filters.forEach(filter => {
      let key = filterKey(filter);
      let val = query[key] ? query[key] + ',' : '';
      query[key] = val + filterValue(filter);
    });

    return query;
  };

  return {
    build
  };
};

module.exports = QueryBuilder;
