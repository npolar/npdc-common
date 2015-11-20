'use strict';

const QueryBuilder = require('./QueryBuilder');
let qb;
describe('QueryBuilder', function() {

  describe('#filterKey', function () {
    it('should handle year facets', function () {
      qb = new QueryBuilder();
      let filters = [{
        term: '2007..2010',
        facet: 'year-released',
        type: 'date',
        min: 2007,
        max: 2010
      }];

      let expected = {
        'filter-released': '2007-01-01T00:00:00Z..2011-01-01T00:00:00Z'
      };

      qb.build(filters).should.eql(expected);
    });
  });

  describe('#build', function() {

    beforeEach(function() {
      qb = new QueryBuilder();
    });

    it('should handle term filters', function() {
      let filters = [{
        "term": "complete",
        "facet": "progress"
      }];

      let expected = {
        'filter-progress': 'complete'
      };
      qb.build(filters).should.eql(expected);
    });

    it('should handle multiple terms on one facet', function() {
      let filters = [{
        "term": "complete",
        "facet": "progress"
      }, {
        "term": "planned",
        "facet": "progress"
      }];

      let expected = {
        'filter-progress': 'complete,planned'
      };
      qb.build(filters).should.eql(expected);
    });

    it('should handle range filters', function() {
      let filters = [{
        "term": "10..20",
        "facet": "temperature"
      }];

      let expected = {
        'filter-temperature': '10..20'
      };
      qb.build(filters).should.eql(expected);
    });

    it('should handle day range filters', function() {
      let filters = [{
        "term": "2015-01-01..2015-01-01",
        "facet": "temperature"
      }];

      let expected = {
        'filter-temperature': '2015-01-01..2015-01-01'
      };
      qb.build(filters).should.eql(expected);
    });
  });
});
