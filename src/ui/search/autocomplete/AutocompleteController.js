'use strict';

let Entities = require('special-entities');

// @ngInject
var AutocompleteController = function($filter, $http, $location, $log, $q, $resource, $scope, $window, NpolarApiResource, NpdcAutocompleteConfig) {
  
  $scope.config = NpdcAutocompleteConfig;
  
  let unescape = function(text) {
    return Entities.normalizeEntities(text, 'utf-8');
  };
  
  this.placeholder = function() {
    return $scope.config.placeholder;
  };
    
  $scope.title = (entry) => {
    let t = entry.title || entry.name || entry.code || $filter('lang')(entry.titles,'title') || entry.id;
    t = t.split('_').join('');
    return unescape(t);
  };
    
    
  // called on select
  this.title = function(e) {
    return $scope.title(e);
  };
  
    
  this.collections = NpdcAutocompleteConfig.collections;
  this.selectedDefault = NpdcAutocompleteConfig.selectedDefault;
    
  this.collectionSelected = {};
  
  this.collections.forEach(c => {
    this.collectionSelected[c] = this.selectedDefault.includes(c) ? true : false ;
  });
    
  this.searchText = $location.search().q;

  this.label = function(document) {
    $log.debug("label()");
    
    
    if (document.collection) {
    
      return document.collection;
    
    } else if (document.schema && (/\/schema\//).test(document.schema)) {
      
      
      let label = document.schema.split("/schema/")[1].replace(/\-.+$/, '').replace(/\.(\w+)$/, '');
      if ("publication" === label) {
        label += `/${document.publication_type}`;
      }
      return label;
    
    } else {
    
      return "";

    }
    
  };
    
    
  // Search all collections for text q
  this.querySearch = function(q) {
      
    let result = [];
    
    // Merge in default query 
    let query = Object.assign({q}, NpdcAutocompleteConfig.query);
      
    let searchCollections = this.collections.filter(c => { return this.collectionSelected[c] });
    $log.debug("searchCollections", searchCollections);
    
    
    let resources = searchCollections.map(s => {
      s = s.replace(/^\/, ''/); //Remove trail
      let path = `/${s}`;
      let service = { path };
      return NpolarApiResource.resource(service);
    });

    return $q.all(resources.map(function(resource) {
      return resource.array(query).$promise;
    })).then(function(results) {
      let f = results.reduce(function(a, b) {
          return a.concat(b);
      }).sort(function(a,b) {
          return (a._score < b._score);
      });
      
      return f;
  
    });
        
      
  };
    
    this.searchTextChange = function(text) {
      //$log.info('Text changed to ' + text);
    };
    
    this.selectedItemChange = function (entry) {
      //$log.debug('selected', entry);
      let path;
      
      if (NpdcAutocompleteConfig.base) {
        path = `${NpdcAutocompleteConfig.base}/${entry.id}`;
      } else {
      
      
        let collection;
        if (entry && entry.schema) {
          
          if (collection = this.collections.find(collection => { return new RegExp(collection).test(entry.schema); })) { 
            path = `/${ collection }/${ entry.id }`;
          }
          
        } else if (entry && entry.collection) {
          
          path = `/${ entry.collection }/${ entry.id }`;
          
        }
        
      }
      
      $log.debug("Redirecting to: ", path)
      $window.location = path;
      
    };
    
};
  
module.exports = AutocompleteController;