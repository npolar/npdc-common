'use strict';

// @ngInject
var SearchResultsController = function($scope, $location, $http, $rootScope,
    NpolarApiSecurity, npdcAppConfig) {
  let options = ($scope.options || npdcAppConfig.search.local).results;

  $scope.security = NpolarApiSecurity;

  $scope.q = function () {
    return $location.search().q || "";
  };

  $scope.entryHref = function(id) {
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
    if (typeof options.avatar === 'function') {
      return options.avatar.call({}, entry);
    }
    if (options.avatar) {
      return valueFromPath(entry, options.avatar);
    }

    return entry.id.substr(0,3);
  };

  $scope.title = (entry) => {
    let title = '';
    if (typeof options.title === 'function') {
      title = options.title.call({}, entry);
    } else if (options.title) {
      title = valueFromPath(entry, options.title);
    } else if (entry.titles) {
      title = entry.titles[0].title;
    } else {
      title = entry.title || entry.name || entry.code || entry.id;
    }
    return title;
  };

  $scope.subtitle = (entry) => {
    if (typeof options.subtitle === 'function') {
      return options.subtitle.call({}, entry);
    }
    if (options.subtitle) {
      return valueFromPath(entry, options.subtitle);
    }
    return entry.created_by;
  };

  $scope.detail = (entry) => {
    if (typeof options.detail === 'function') {
      return options.detail.call({}, entry);
    }
    if (options.detail) {
      return valueFromPath(entry, options.detail);
    }

    return entry.updated.split("T")[0];
  };

  $scope.showNext = function() {
    if (!$scope.feed) {
      return false;
    }
    return ($scope.feed.entries.length < $scope.feed.opensearch.totalResults);
  };

  $scope.next = function() {
    if (!$scope.feed.links) {
      return;
    }

    let nextLink = $scope.feed.links.find(link => { return (link.rel === "next"); });
    if (nextLink.href) {
      $http.get(nextLink.href.replace(/^https?:/, '')).success(function(response) {
        response.feed.entries = $scope.feed.entries.concat(response.feed.entries);
        $scope.feed = response.feed;
      });
    }
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
