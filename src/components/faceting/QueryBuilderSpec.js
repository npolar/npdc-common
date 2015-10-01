'use strict';

const QueryBuilder = require('./QueryBuilder');
let qb;
describe('QueryBuilder', function () {
  describe('#build', function () {

    beforeEach(function () {
      qb = new QueryBuilder();
    });

    it('should handle search text', function () {
      let q = 'test';
      let filters = {
        array: []
      };

      let expected = {
        q: 'test'
      };
      qb.build(q, filters).should.eql(expected);
    });

    it('should handle term filters', function () {
      let q = 'test';
      let filters = {
        array: [{
          "term": "complete",
          "facet": "progress"
        }]
      };

      let expected = {
        q: 'test',
        'filter-progress': 'complete'
      };
      qb.build(q, filters).should.eql(expected);
    });

    it('should handle multiple terms on one facet', function () {
      let filters = {
        array: [{
          "term": "complete",
          "facet": "progress"
        },
        {
          "term": "planned",
          "facet": "progress"
        }]
      };

      let expected = {
        q: '',
        'filter-progress': 'complete,planned'
      };
      qb.build(null, filters).should.eql(expected);
    });

    it('should handle range filters', function () {
      let filters = {
        array: [{
          "term": "10..20",
          "facet": "temperature"
        }]
      };

      let expected = {
        q: '',
        'filter-temperature': '10..20'
      };
      qb.build('', filters).should.eql(expected);
    });

    it('should handle day range filters', function () {
      let filters = {
        array: [{
          "term": "2015-01-01..2015-01-01",
          "facet": "temperature"
        }]
      };

      let expected = {
        q: '',
        'filter-temperature': '2015-01-01..2015-01-01'
      };
      qb.build('', filters).should.eql(expected);
    });
  });
});
