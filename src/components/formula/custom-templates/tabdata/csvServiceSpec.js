'use strict';
require('should');

var csvService = require('./csvService')();
var spectrum = require('csv-spectrum');

describe('csvService', function() {
  describe('#csvToJSON', function() {
    it('should parse', function() {
      var data =
` some,values
more,data`;
      var expected = [{h1: "some", h2: "values"},{h1: 'more', h2: "data"}];

      csvService.csvToJSON(data, ['h1', 'h2']).should.eql(expected);
    });

    it('should not split on comma in quoted string', function() {
      var data = "\"some,values\"";
      var expected = [{h1: "some,values", h2: undefined}];

      csvService.csvToJSON(data, ['h1', 'h2']).should.eql(expected);
    });

    it('should parse number as numbers', function() {
      var data = "2,-1,0,0.0,10e-2,NaN,Infinity,-Infinity";
      var expected = [{
        uint: 2,
        sint: -1,
        zero: 0,
        float: 0.0,
        scientific: 10e-2,
        nan: NaN,
        inf: Infinity,
        neginf: -Infinity
      }];

      csvService.csvToJSON(data, ['uint', 'sint', 'zero', 'float', 'scientific', 'nan', 'inf', 'neginf']).should.eql(expected);
    });

    it('should parse booleans as boolean', function() {
      var data = "true,false,TRUE,FALSE";
      var expected = [{
        true: true,
        false: false,
        TRUE: true,
        FALSE: false
      }];

      csvService.csvToJSON(data, ['true', 'false', 'TRUE', 'FALSE']).should.eql(expected);
    });

    it('should parse empty value as undefined', function() {
      var data = ",";
      var expected = [{
        udef1: undefined,
        udef2: undefined
      }];

      csvService.csvToJSON(data, ['udef1','udef2']).should.eql(expected);
    });

    it('should fill missing values with undefined', function() {
      var data = "a";
      var expected = [{
        h1: "a",
        h2: undefined
      }];

      csvService.csvToJSON(data, ['h1','h2']).should.eql(expected);
    });

    it('should skip values out of header bounds', function() {
      var data = "a,b,c";
      var expected = [{
        h1: "a"
      }];

      csvService.csvToJSON(data, ['h1']).should.eql(expected);
    });

    it('should pass spectrum test suite', function () {
      spectrum((err, data) => {
        data.forEach(td => {
          csvService.csvToJSON(td.csv.toString()).should.eql(JSON.parse(td.json.toString()));
        });
      });
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
