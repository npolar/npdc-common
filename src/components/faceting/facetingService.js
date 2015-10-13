'use strict';

let facetingServiceFactory = function ($rootScope) {
  let serviceInstance = {
    emit(event, data) {
      $rootScope.$emit(event, data);
    },
    on(event, callback) {
      $rootScope.$on(event, callback);
    }
  };
  return serviceInstance;
};

module.exports = facetingServiceFactory;
