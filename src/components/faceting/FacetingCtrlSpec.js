'use strict';
require('should');
let FacetingCtrl = require('./FacetingCtrl');

describe('FacetingCtrl', function() {
  let scopeMock, facetingCtrl;

  beforeEach(function() {
    facetingCtrl = undefined;
    scopeMock = {
      $watch() {}
    };
  });

  it('should init day range facets', function() {
    let facet;
    scopeMock.data = [{
      "day-measured": [{
        "term": "2015-01-01",
        "count": 0
      }, {
        "term": "2015-01-02",
        "count": 0
      }]
    }];
    scopeMock.options = {
      'day-measured': {
        type: 'range'
      }
    };

    facetingCtrl = new FacetingCtrl(scopeMock);
    facet = scopeMock.data[0];

    facet.slider.min.should.eql(20150101);
    facet.slider.max.should.eql(20150102);
  });

  it('should init month range facets', function() {
    let facet;
    scopeMock.data = [{
      "month-measured": [{
        "term": "2015-01",
        "count": 0
      }]
    }];
    scopeMock.options = {
      'month-measured': {
        type: 'range'
      }
    };

    facetingCtrl = new FacetingCtrl(scopeMock);
    facet = scopeMock.data[0];

    facet.slider.min.should.eql(201501);
  });

  it('should init year range facets', function() {
    let facet;
    scopeMock.data = [{
      "month-measured": [{
        "term": "2015",
        "count": 0
      }]
    }];
    scopeMock.options = {
      'month-measured': {
        type: 'range'
      }
    };

    facetingCtrl = new FacetingCtrl(scopeMock);
    facet = scopeMock.data[0];

    facet.slider.min.should.eql(2015);
  });

  describe('#querySearch', function() {
    beforeEach(function() {
      scopeMock.data = require('./demo/facets.json').facets;
      facetingCtrl = new FacetingCtrl(scopeMock);
    });

    it('should return all for empty search', function() {
      let topics = scopeMock.data[2];
      let result;

      topics.searchText = '';
      result = scopeMock.querySearch(topics);
      result.length.should.eql(topics.topics.length);
    });

    it('should filter results', function() {
      let topics = scopeMock.data[2];
      let result;

      topics.searchText = 'a';
      result = scopeMock.querySearch(topics);
      result.length.should.eql(topics.topics.filter(item => item.term.indexOf('a') === 0).length);
    });
  });

});
