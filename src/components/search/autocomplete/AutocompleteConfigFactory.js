'use strict';

// @ngInject
let AutocompleteConfigFactory = function($location, $rootScope) {

  let showCollections = false;
  let placeholder = "Search Norwegian Polar Data Centre";

  let collections = {
    '/dataset': true,
    '/expedition': true,
    '/indicator': true,
    '/publication': true,
    '/project': true,
    '/indicator/parameter': false,
    '/map/archive': false,
    '/person': false,
    '/placename': false,
    '/tracking/deployment': false,
    '/service': false,
    '/vessel': false
  };

  let query = {
    limit: 10,
    score: true,
    fields: 'id,_score,schema,collection,titles,names,title,name,code,platform,publication_type,journal.name,published_sort'
  };

  let constructor = function (options) {
    return Object.assign({
      collections,
      showCollections,
      placeholder,
      query,
      respectUrl: true,
      location: undefined,
    }, options);
  };

  return constructor;
};

module.exports = AutocompleteConfigFactory;
