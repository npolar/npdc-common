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
    return { q: testUrl.split('q=')[1]};
  }
};

let $rootScopeMock = {
  $on(event, callback) {
    callback.call({}, event, testUrl);
  }
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

  it("should handle home route", function () {
    testUrl += "/home/search";
    let breadcrumbsService = new BreadcrumbsService($locationMock, $rootScopeMock, $windowMock);
    breadcrumbsService.breadcrumbs[0].should.have.property('href','/home');
    breadcrumbsService.breadcrumbs[1].should.have.property('href','/home/search');
  });

  it("should handle app start", function () {
    testUrl += "/dataset";
    let breadcrumbsService = new BreadcrumbsService($locationMock, $rootScopeMock, $windowMock);
    breadcrumbsService.breadcrumbs[0].should.have.property('href','/home');
    breadcrumbsService.breadcrumbs[1].should.have.property('href','/dataset');
  });

  it("should handle app route", function () {
    testUrl += "/dataset/someid";
    let breadcrumbsService = new BreadcrumbsService($locationMock, $rootScopeMock, $windowMock);
    breadcrumbsService.breadcrumbs[0].should.have.property('href','/home');
    breadcrumbsService.breadcrumbs[1].should.have.property('href','/dataset');
    breadcrumbsService.breadcrumbs[2].should.have.property('href','/dataset/someid');
  });

  it("should handle query", function () {
    testUrl += "/home?q=lol";
    let breadcrumbsService = new BreadcrumbsService($locationMock, $rootScopeMock, $windowMock);
    breadcrumbsService.breadcrumbs[0].should.have.property('href','/home');
    breadcrumbsService.breadcrumbs[1].should.have.property('text','"lol"');
  });

  it("should return to app route when on a document ", function(){
    testUrl += "/ny-alesund/a8c8dfd0-f42e-403e-a913-5f35fabe6caf";
    let breadcrumbsService = new BreadcrumbsService($locationMock, $rootScopeMock, $windowMock);
    breadcrumbsService.breadcrumbs[0].should.have.property('href','/home');
    breadcrumbsService.breadcrumbs[1].should.have.property('href','/ny-alesund');
    breadcrumbsService.breadcrumbs[2].should.have.property('text','a8c8dfd0');
  });
});
