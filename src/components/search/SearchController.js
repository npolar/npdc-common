'use strict';

// @ngInject
var SearchController = function($scope, $location, NpolarApiSecurity, npdcAppConfig) {

  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;
  npdcAppConfig.search.immidiate = true;

  // Simplify facet array to facet object
  $scope.facet = function(farr) {
    let keys = Object.keys(farr);
    let key = keys[0];
    let facet = farr[key].map(f => {

      f.facet = key;
      return f;

    });

    return facet;

  };

  // Get search bit of API URI
  $scope.facetHref = function(uri) {
    return "?" + uri.split("?")[1];
  };

  $scope.facetKey = function(facet) {
    return Object.keys(facet)[0];
  };

  $scope.entryHref = function(id) {
    if ((/[.]/).test(id)) {
      id += ".json";
    }
    // Get relative path of entry by removing hostname + appname from request URI
    let segments = $location.absUrl().split("//")[1].split("?")[0].split("/").filter(s => {
      return s !== "";
    }).slice(2);

    if (segments.length === 0) {
      // For apps at /something, we just need to link to the id
      return id;
    } else {
      // For apps at /cat, but with show/edit at /cat/lynx we link to `lynx/${id}`
      return segments.join("/") + '/' + id;
    }
  };

  $scope.title = (entry) => {
    if (entry.titles) {
      return entry.titles[0].title;
    }
    return entry.title || entry.name || entry.code || entry.id;
  };

  // Get facet object { term, uri, facet, count } from filter object like { "filter-term": "X" }
  $scope.facetObjectFromFilter = function(filter) {
    //let term = filter[ Object.keys(filter)[0] ];
    let key = $scope.facetKey(filter).replace(/^filter\-/, "");

    //
    let facets = $scope.feed.facets.find(facet => {
      //console.log(facet, term);
      return (facet.hasOwnProperty(key) && facet.hasOwnProperty(key) === "Tromsø");
    });

    //console.log(facet);
    return facets[key];

  };

};

module.exports = SearchController;
