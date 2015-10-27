'use strict';

// @ngInject
var SearchResultsController = function($scope, $location, NpolarApiSecurity, npdcAppConfig) {

  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;

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
};

module.exports = SearchResultsController;
