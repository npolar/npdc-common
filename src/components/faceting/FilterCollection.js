'use strict';

let EventEmitter = require('events');

let FilterCollection = function() {
  let filters = [];
  let emitter = new EventEmitter();

  let equals = function(itemA, itemB) {
    return (itemA.term === itemB.term && itemA.facet === itemB.facet);
  };

  let add = function(filter) {
    if (!filters.some(item => equals(filter, item))) {
      filters.push(filter);
      emitter.emit('change', filters);
    }
  };

  let remove = function(filter) {
    let index = filters.findIndex(item => equals(filter, item));
    if (index !== -1) {
      filters.splice(index, 1)[0].selected = false;
      emitter.emit('change', filters);
    }
  };

  let removeRangeFilter = function(facet) {
    let index = filters.findIndex(item => item.facet === facet.key);
    if (index !== -1) {
      filters.splice(index, 1);
      emitter.emit('change', filters);
    }
  };

  let isInRange = function(item, min, max) {
    let value = parseInt(item.term);
    return (value >= min && value <= max);
  };

  let addRangeFilter = function(facet) {
    let filter, existingFilter;
    let terms = facet[facet.key].filter(item => isInRange(item, facet.slider.min, facet.slider.max));

    filter = {
      count: terms.reduce((memo, item) => memo + item.count, 0),
      term: facet.slider.min + ".." + facet.slider.max,
      facet: facet.key,
      type: /^(year|month|day)-.*$/.test(facet.key) ? 'date' : 'number'
    };
    existingFilter = filters.find(item => filter.facet === item.facet);
    if (!existingFilter) {
      filters.push(filter);
    } else {
      existingFilter.term = filter.term;
      existingFilter.count = filter.count;
    }
    emitter.emit('change', filters);
  };

  let clear = function() {
    filters.splice(0, filters.length);
  };

  return {
    add,
    addRangeFilter,
    remove,
    removeRangeFilter,
    clear,
    array: filters,
    on() { EventEmitter.prototype.on.apply(emitter, arguments); }
  };
};

module.exports = FilterCollection;
