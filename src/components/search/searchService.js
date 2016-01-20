'use strict';

// @ngInject
let SearchService = function ($location, $window, npdcAppConfig, formulaAutoCompleteService) {
  return {
    search (query) {
      console.log('Search', query);
      let prevSearch = $location.search();
      Object.keys(prevSearch).filter(k => !(/^filter-/.test(k) || query.hasOwnProperty(k))).forEach(k => {
        query[k] = prevSearch[k];
      });

      $location.search(query);
    },
    globalSearch (query) {
      console.log('Global search', query);
      if (/^\/home\/search/.test($location.path())) {
        $location.search(query);
      } else if (/^\/home/.test($location.path())) {
        $location.$$search = query;
        $location.$$path = '/search/';
        $location.$$compose();
      } else {
        $window.location.href = '/home/search?q=' + query.q;
      }
    },
    injectAutocompleteFacetSources(autocompleteFacets, resource) {
      let path = function(term) {
        return '#/' + term.split('.').join('/');
      };
      let facets = autocompleteFacets.join(',');
      
      resource.facets({ facets, q: '' }, facets => {
        let relevant = facets.filter(f => autocompleteFacets.includes(f.facet));
        relevant.forEach(r => {
    
          // The callback function need NOT to receive any argument, or else it stops working
          let source = () => r.terms.map(t => t.term);
          formulaAutoCompleteService.bindSourceCallback(path(r.facet), source);
          
          
        });
    
        
        
      });
    
    
    
    }
    
  };
};

module.exports = SearchService;
