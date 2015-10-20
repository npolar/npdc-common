'use strict';

// @ngInject
let autocompleteConfigService = function($location, $rootScope) {

  let collections = ['dataset', 'expedition', 'indicator', 'indicator/parameter', 'map/archive', 'person', 'placename', 'project', 'publication', 'tracking/deployment', 'service', 'vessel'];
  let selectedDefault = ['dataset', 'expedition', 'indicator', 'publication', 'project'];
  let showCollections = false;
  let placeholder = "Search Norwegian Polar Data Centre";
  let base = $location.path().replace(/^\//, '');

  let collectionSelected = {};

  collections.forEach(c => {
    collectionSelected[c] = selectedDefault.includes(c) ? true : false;
  });

  let query = {
    limit: 10,
    score: true,
    fields: 'id,_score,schema,collection,titles,names,title,name,code,platform,publication_type,journal.name,published_sort'
  };

  let serviceInstance = {
    emit(event, data) {
      $rootScope.$emit(event, data);
    },
    on(event, callback) {
      $rootScope.$on(event, callback);
    },
    collections,
    selectedDefault,
    showCollections,
    placeholder,
    base,
    collectionSelected,
    query
  };

  return serviceInstance;
};

module.exports = autocompleteConfigService;
