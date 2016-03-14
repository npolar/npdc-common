'use strict';

let SearchService = function($location, $window, $q, npolarDocumentUtil, npdcAppConfig, NpolarApiResource) {
  'ngInject';

  let globalCollections = npdcAppConfig.search.global.collections;

  let buildResources = function(collections) {
    let searchResources = [];
    collections.forEach(c => {
      searchResources.push(NpolarApiResource.resource({
        path: c.path
      }));
    });
    return searchResources;
  };

  let globalSearchResources = buildResources(globalCollections);

  return {
    search(query) {
      console.log('Search', query);
      let prevSearch = $location.search();
      Object.keys(prevSearch).filter(k => !(/^filter-/.test(k) || query.hasOwnProperty(k))).forEach(k => {
        query[k] = prevSearch[k];
      });

      $location.search(query);
    },
    globalSearch(query) {
      console.log('Global search', query);
      if (/^\/home\/search/.test(location.pathname)) {
        $location.search(query);
      } else if (/^\/home/.test(location.pathname)) {
        $location.$$search = query;
        $location.$$path = '/search/';
        $location.$$compose();
      } else {
        $window.location.href = '/home/search?q=' + query.q;
      }
    },
    searchCollections: function(q, options = {}) {
      // Merge in default query, respect url ?
      q = (q || '').toLocaleLowerCase();
      let query = Object.assign({},
        options.respectUrl ? $location.search() : {},
        options.query, {
          q
        });

      let collections = globalCollections;
      let searchResources = globalSearchResources;
      if (options.collections) {
        collections = options.collections;
        searchResources = buildResources(collections);
      }

      return $q.all(searchResources.map(resource => resource.array(query).$promise))
        .then(results => results.reduce((memo, result, index) => {
            // Get collection name from options (if not set in document)
            let items = result.map(item => {
              item.collection = item.collection || collections[index].name;
              item.path = collections[index].path + '/' + item.id;
              return item;
            });
            return memo.concat(items);
          }, [])
          .sort((a, b) => {
            let aIndex = npolarDocumentUtil.title(a).toLocaleLowerCase().indexOf(q);
            let bIndex = npolarDocumentUtil.title(b).toLocaleLowerCase().indexOf(q);

            // sort on best title match q
            let sort = 0;
            if (aIndex === bIndex === -1) {
              // sort on score
              if (a._score < b._score) {
                sort = -1;
              } else if (a._score > b._score) {
                sort = 1;
              }
            } else {
              if (aIndex !== -1 && bIndex !== -1) {
                // sort on title
                if (aIndex < bIndex) {
                  sort = -1;
                } else if (aIndex > bIndex) {
                  sort = 1;
                }
              } else {
                // one of a and b is -1
                sort = bIndex === -1 ? -1 : 1;
              }
            }

            return sort;
          }));
    }
  };
};

module.exports = SearchService;
