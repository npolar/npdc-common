'use strict';

let AutocompleteConfigFactory = function(NpolarTranslate) {
  'ngInject';

  let showCollections = false;
  let floatingLabel = true;

  let collections = [
    {
      name: 'publication',
      path: '/publication',
      enabled: true
    },
    {
      name: 'timeseries',
      path: '/indicator/timeseries',
      enabled: true
    },
    {
      name: 'map-archive',
      path: '/map/archive',
      enabled: true
    },
    {
      name: 'person',
      path: '/person',
      enabled: true
    },
    {
      name: 'service',
      path: '/service',
      enabled: true
    },
    {
      name: 'vessel',
      path: '/vessel',
      enabled: false,
    },
    {
      name: 'dataset',
      path: '/dataset',
      enabled: true
    }
  ];

  let query = {
    limit: 30,
    score: true,
    fields: 'id,_score,schema,collection,titles,names,title,name,code,platform,publication_type,journal.name,published_sort'
  };


  let constructor = function (options) {
    return Object.assign({
      collections,
      showCollections,
      placeholder: NpolarTranslate.translate('search'),
      query,
      global: false,
      location: undefined,
      floatingLabel,
    }, options);
  };

  return constructor;
};

module.exports = AutocompleteConfigFactory;
