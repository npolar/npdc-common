'use strict';

let AutocompleteConfigFactory = function(NpolarTranslate) {
  'ngInject';

  let showCollections = false;
  let floatingLabel = true;
  let placeholder = NpolarTranslate.translate('search');

  let collections = {
    '/dataset': true,
    // '/expedition': true,
    '/publication': true,
    // '/project': true,
    '/indicator/timeseries': true,
    '/map/archive': true,
    '/person': true,
    '/placename': true,
    '/tracking/deployment': true,
    '/service': true,
    '/vessel': true,
  };

  let query = {
    limit: 30,
    score: true,
    fields: 'id,_score,schema,collection,titles,names,title,name,code,platform,publication_type,journal.name,published_sort'
  };


  let constructor = function (options) {
    return Object.assign({
      collections,
      showCollections,
      placeholder,
      query,
      global: false,
      location: undefined,
      floatingLabel,
    }, options);
  };

  return constructor;
};

module.exports = AutocompleteConfigFactory;
