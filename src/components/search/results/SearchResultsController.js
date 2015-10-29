'use strict';

// @ngInject
var SearchResultsController = function($scope, $location, NpolarApiSecurity, npdcAppConfig) {
  $scope.options = npdcAppConfig.search.results;

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

  $scope.avatar = (entry) => {
    if ($scope.options.avatar) {
      return valueFromPath(entry, $scope.options.avatar);
    }

    return entry.id.substr(0,3);
  };

  $scope.title = (entry) => {
    if ($scope.options.title) {
      return valueFromPath(entry, $scope.options.title);
    }

    if (entry.titles) {
      return entry.titles[0].title;
    }

    return entry.title || entry.name || entry.code || entry.id;
  };

  $scope.subTitle = (entry) => {
    if ($scope.options.subtitle) {
      return valueFromPath(entry, $scope.options.subtitle);
    }
    return entry.created_by;
  };

  $scope.detail = (entry) => {
    if ($scope.options.detail) {
      return valueFromPath(entry, $scope.options.detail);
    }

    return entry.updated.split("T")[0];
  };


  function valueFromPath(object, path, separator) {
    if("object" === typeof object && "string" === typeof path) {
      var node = object;

      if("string" !== typeof separator || !separator.length) {
        separator = "/";
      }

      for(var segment; path && (segment = path.split(separator)[0]); path = path.slice(segment.length + separator.length)) {
        if("object" === typeof node) {
          node = node[segment];
        }
      }

      if (node instanceof Array) {
        node = node.join(', ');
      }

      return node;
    }

    return undefined;
  }
};

module.exports = SearchResultsController;
