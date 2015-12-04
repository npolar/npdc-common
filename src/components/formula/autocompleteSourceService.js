'use strict';

// @ngInject
let AutocompleteSourceService = function($http, $q) {

  const URI_REGEX = /^(https?|\/\/)/;
  const ERR = "Invalid autocomplete source";

  let sources = {};

  let defineSource = function (key, cb) {
    sources[key] = cb;
  };

  let getSource = function (source) {
    let deferred = $q.defer();

    if (sources.hasOwnProperty(source) && sources[source].constructor === Function) {
      // source is a registred function
      deferred.resolve(sources[source].call({}));
    } else if (URI_REGEX.test(source)) {
      // source is uri
      $http.get(source).then(response => {
        deferred.resolve(response);
      }, response => {
        deferred.reject(new Error(ERR, source));
      });
    } else if (source.constructor === Array) {
      // source is json array
      deferred.resolve(source);
    } else {
      deferred.reject(new Error(ERR, source));
    }

    return deferred.promise;
  };

  return {
    defineSource,
    getSource
  };
};

module.exports = AutocompleteSourceService;
