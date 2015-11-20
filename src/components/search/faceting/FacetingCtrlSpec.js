'use strict';
require('should');
let FacetingCtrl = require('./FacetingCtrl');

describe('FacetingCtrl', function() {
  let scopeMock, facetingCtrl, locationMock;

  beforeEach(function() {
    facetingCtrl = undefined;
    scopeMock = {
      options: {},
      $watch() {},
      $on() {}
    };
    locationMock = {
      search() {}
    };
  });

  it('should init year range facets', function() {
    let facet;
    scopeMock.options.facets = [{
      "year-measured": [{
        "term": "2015",
        "count": 0
      },
      {
        "term": "2016",
        "count": 1
      }]
    }];
    scopeMock.options.filterUi = {
      'year-measured': {
        type: 'range'
      }
    };

    facetingCtrl = new FacetingCtrl(scopeMock, locationMock);
    facet = scopeMock.options.facets[0];

    facet.slider.min.should.eql(2015);
  });

  describe('#querySearch', function() {
    beforeEach(function() {
      scopeMock.options.facets = require('./demo/facets.json').facets;
      facetingCtrl = new FacetingCtrl(scopeMock, locationMock);
    });

    it('should return all for empty search', function() {
      let topics = scopeMock.options.facets[2];
      let result;

      topics.searchText = '';
      result = scopeMock.querySearch(topics);
      result.length.should.eql(topics.topics.length);
    });

    it('should filter results', function() {
      let topics = scopeMock.options.facets[2];
      let result;

      topics.searchText = 'a';
      result = scopeMock.querySearch(topics);
      result.length.should.eql(topics.topics.filter(item => item.term.indexOf('a') === 0).length);
    });
  });

});
