Autocomplete directive

See NpdcAutocompleteConfig for configuration options

```xml
<npdc:autocomplete options="options"></npdc:autocomplete>
```

Usage example for single-api autocomplete

```javascript
'use strict';
/**
 * @ngInject
 */
var Controller = function ($scope, NpdcAutocompleteConfigFactory, npdcAppConfig) {

  $scope.options = new NpdcAutocompleteConfigFactory({});
  // See NpdcAutocompleteConfigFactory for defaults

  // or

  $scope.options = npdcAppConfig.search.global;
  // for global autocomplete search configuration
};

module.exports = Controller;
```
