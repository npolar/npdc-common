'use strict';

let autocompleteSourceServiceProvider = require('./autocompleteSourceService');
let q = require('q');

let $httpMock = {
  get(uri) {
    let deferred = q.defer();
    deferred.resolve({data: []});
    return deferred.promise;
  }
};


let autocompleteSourceService = autocompleteSourceServiceProvider($httpMock, q);

describe('autocompleteSourceService', () => {

  it('should handle array source', (done) => {
    let source = ["a", "b"];
    autocompleteSourceService.getSource(source).then(response => {
      response.should.eql(source);
      done();
    }, (e) => { done(e); });
  });

  it('should handle uri source', (done) => {
    let source = "//api.npolar.no/datasets?q=lalala";
    autocompleteSourceService.getSource(source).then(response => {
      response.should.eql([]);
      done();
    }, (e) => { done(e); });
  });

  it('should handle function source', (done) => {
    let source = "myFunc";
    let expected = ["yolo"];
    autocompleteSourceService.defineSourceFunction('myFunc', () => {
      return expected;
    });
    autocompleteSourceService.getSource(source).then(response => {
      response.should.eql(expected);
      done();
    }, (e) => { done(e); });
  });

  it('should handle object source', (done) => {
    let source = {
      source: {"propA": "a", "propB": "b"},
      callback: "objCallback"
    };
    let expected = ["a", "b"];
    autocompleteSourceService.defineSourceFunction('objCallback', (src) => {
      return [src.propA, src.propB];
    });
    autocompleteSourceService.getSource(source).then(response => {
      response.should.eql(expected);
      done();
    }, (e) => { done(e); });
  });
});
