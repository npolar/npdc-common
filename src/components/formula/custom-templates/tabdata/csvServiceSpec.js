'use strict';
require('should');

var csvService = require('./csvService')();

describe('csvService', function() {
  describe('#csvToJSON', function() {
    it('should parse', function() {
      var data =
`some,values
more,data`;
      var expected = [{h1: "some", h2: "values"},{h1: 'more', h2: "data"}];

      csvService.csvToJSON(data, ['h1', 'h2']).should.eql(expected);
    });

    it('should not split on comma in quoted string', function() {
      var data = "\"some,values\"";
      var expected = [{h1: "\"some,values\""}];

      csvService.csvToJSON(data, ['h1', 'h2']).should.eql(expected);
    });
  });

  describe('#jsonToCSV', function() {
    it('should parse', function() {
      var data = [{h1: "some", h2: "values"},{h1: "more", h2: "data"}];
      var expected = "some,values\r\nmore,data";

      csvService.jsonToCSV(data).should.eql(expected);
    });
  });
});
