'use strict';

// @ngInject
  let autocompleteConfigService = function($location) {
  
  // http://api.npolar.no/service/?q=&filter-search.engine=Elasticsearch|Solr&fields=path
  this.collections = ['dataset', 'expedition', 'indicator', 'indicator/parameter', 'map/archive', 'person', 'placename', 'project', 'publication', 'tracking/deployment', 'service', 'vessel'];
  this.selectedDefault = ['dataset', 'expedition', 'indicator', 'publication', 'project'];
  this.showCollections = false;
  this.placeholder = "Search Norwegian Polar Data Centre";
  this.base = $location.path().replace(/^\//, '');
  
  this.collectionSelected = {};
    
  this.collections.forEach(c => {
    this.collectionSelected[c] = this.selectedDefault.includes(c) ? true : false ;
  });
  
  this.query = { limit: 10,
    score: true,
    fields:'id,_score,schema,collection,titles,names,title,name,code,platform,publication_type,journal.name,published_sort'
  };
  
  return this;
};

module.exports = autocompleteConfigService;