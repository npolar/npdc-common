'use strict';
let BreadcrumbsService = require('./BreadcrumbsService');
let testUrl;
let $locationMock = {
  absUrl() {
    return testUrl;
  },
  host() {
    return "localhost";
  },
  search() {
    return { q: ''};
  }
};

let $rootScopeMock = {
  $on() {}
};

let $windowMock = {
  document: {}
};

describe("BreadcrumbsService", function () {
  beforeEach(function () {
    testUrl = "http://localhost";
  });

  it("should handle home start", function () {
    testUrl += "/home";
    let breadcrumbsService = new BreadcrumbsService($locationMock, $rootScopeMock, $windowMock);
    breadcrumbsService.breadcrumbs[0].should.have.property('href','/home');
  });
});
