'use strict';
require('should');
const FilterCollection = require('./FilterCollection');
let filters;

describe('FilterCollection', function() {
  beforeEach(function() {
    filters = new FilterCollection();
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

    it('should trigger event', function(done) {
      var item = {
        facet: 'test',
        term: 'test'
      };
      filters.on('change', filters => {
        done();
      });
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

});
