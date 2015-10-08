Autocomplete directive

See NpdcAutocompleteConfig for configuration options

```xml
<npdc:autocomplete></npdc:autocomplete>
```

Usage example for single-api autocomplete

```javascript
'use strict';
/**
 * @ngInject
 */
var DatasetSearchController = function ($scope, $location, $controller, Dataset, NpdcAutocompleteConfig) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Dataset;
  
  let defaults = { limit: 50, sort: "-updated,-released", fields: 'title,id,collection,schema', facets: "topics", score: true };
  let invariants = $scope.security.isAuthenticated() ? {} : { "not-draft": "yes", "not-progress": "planned", "filter-links.rel": "data" } ;  
  let query = Object.assign(defaults, $location.search(), invariants);
  
  NpdcAutocompleteConfig.selectedDefault = ['dataset'];
  NpdcAutocompleteConfig.placeholder = 'Search dataset catalogue';
  NpdcAutocompleteConfig.query = defaults;
  
  
  $scope.search(query);
  
};

module.exports = DatasetSearchController;
```