'use strict';

let autocompleteSourceServiceProvider = require('./autocompleteSourceService');
let q = require('q');

let $httpMock = {
  get(uri) {
    let deferred = q.defer();
    deferred.resolve([]);
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
    autocompleteSourceService.defineSource('myFunc', () => {
      return expected;
    });
    autocompleteSourceService.getSource(source).then(response => {
      response.should.eql(expected);
      done();
    }, (e) => { done(e); });
  });
});
