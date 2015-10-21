'use strict';
require('should');
const FilterCollection = require('./FilterCollection');
let filters, $scope, callback;

describe('FilterCollection', function() {
  beforeEach(function() {
    $scope = {};
    callback = () => {};
    filters = new FilterCollection($scope, callback);
  });
  describe('#add', function() {

    it('should add', function() {
      var item = {
        facet: 'test',
        term: 'test'
      };

      filters.add(item);
      filters.array[0].should.eql(item);
    });

    it('should be unique', function() {

      var item = {
        facet: 'test',
        term: 'test'
      };

      filters.add(item);
      filters.add(item);
      filters.array.length.should.eql(1);
    });

    it('should trigger callback', function(done) {
      callback = () => {done();};
      filters = new FilterCollection($scope, callback);
      var item = {
        facet: 'test',
        term: 'test'
      };

      filters.add(item);
    });
  });

  describe('#remove', function() {
    it('should remove', function() {
      var item = {
        facet: 'test',
        term: 'test'
      };
      var item2 = {
        facet: 'test2',
        term: 'test2'
      };

      filters.add(item);
      filters.add(item2);
      filters.remove(item);
      filters.array.length.should.eql(1);
    });
  });

  describe('#addRangeFilter', function () {
    it('should set type to date for year, month and day facets', function () {
      let facet = {
        key: 'year-released',
        'year-released': [{
          term: '2001',
          facet: 'year-released',
        }],
        slider: {
          min: 2001,
          max: 2001
        }
      };

      filters.addRangeFilter(facet);
      filters.array[0].type.should.eql('date');
    });

    it('should set number for non date range filters', function () {
      let facet = {
        key: 'temperature',
        'temperature': [{
          term: 90,
          facet: 'temperature',
        }],
        slider: {
          min: 90,
          max: 90
        }
      };

      filters.addRangeFilter(facet);
      filters.array[0].type.should.eql('number');
    });
  });

});
