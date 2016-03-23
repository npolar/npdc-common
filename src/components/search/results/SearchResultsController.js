'use strict';

var SearchResultsController = function($scope, $filter, $location, $http, NpolarApiSecurity,
  npdcAppConfig, npolarDocumentUtil, NpdcApplications) {
  'ngInject';

  let options = Object.assign({}, npdcAppConfig.search.local.results, $scope.options ? $scope.options.results : {});

  $scope.security = NpolarApiSecurity;

  $scope.q = function () {
    return $location.search().q || "";
  };

  $scope.entryHref = function(id) {
    return $scope.resource.href(id);
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

  $scope.icon = function () {
    let app = NpdcApplications.find(app => {
      return new RegExp(app.link).test($scope.resource.uiBase);
    });
    if (app) {
      return app.icons.find(icon => icon.size === 48).src;
    }
  };

  $scope.title = (entry) => {
    let title = '';
    if (typeof options.title === 'function') {
      title = options.title.call({}, entry);
    } else if (options.title) {
      title = valueFromPath(entry, options.title);
    } else {
      title = npolarDocumentUtil.title(entry);
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

    return entry.updated ? entry.updated.split("T")[0]: undefined;
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
