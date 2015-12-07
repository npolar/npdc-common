'use strict';

// @ngInject
let AutocompleteSourceService = function($http, $q) {

  const URI_REGEX = /^(https?|\/\/)/;
  const ERR = "Invalid autocomplete source ";

  let sources = {};

  let isFn = function (key) {
    return sources[key] && sources[key].constructor === Function;
  };

  let isObject = function (source) {
    return source.constructor === Object &&
      source.hasOwnProperty('source') && source.hasOwnProperty('callback');
  };

  let isURI = function (source) {
    return source && (URI_REGEX.test(source) || (isObject(source) && isURI(source.source)));
  };

  let defineSourceFunction = function (key, cb) {
    sources[key] = cb;
  };

  let getSource = function (source, q) {
    let deferred = $q.defer();

    if (isFn(source)) {
      // source is a registred function
      deferred.resolve(sources[source].call({}));
    } else if (URI_REGEX.test(source)) {
      // source is uri
      let config = q ? { params: { q: q } } : {};
      $http.get(source, config).then(response => {
        deferred.resolve(response.data);
      }, response => {
        deferred.reject(new Error(ERR + source));
      });
    } else if (source.constructor === Array) {
      // source is array
      deferred.resolve(source);
    } else if (isObject(source)) {
      // source is object
      getSource(source.source, q).then(response => {
        deferred.resolve(sources[source.callback].call({}, response));
      }, response => {
        deferred.reject(new Error(ERR + source));
      });
    } else {
      deferred.resolve(source);
    }

    return deferred.promise;
  };

  return {
    defineSourceFunction,
    getSource,
    isURI
  };
};

module.exports = AutocompleteSourceService;
