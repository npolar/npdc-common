'use strict';

require('../../');
let angular = require('angular');

angular.module('expandSearchDemo', ['npdcUi']).controller('ExpandSearchDemoCtrl', function ($scope, NpdcAutocompleteConfigFactory) {
  $scope.options = {
    autocomplete: new NpdcAutocompleteConfigFactory({showCollections: true})
  };

});
