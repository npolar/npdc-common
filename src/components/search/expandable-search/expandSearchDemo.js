'use strict';

require('../../');
let angular = require('angular');

angular.module('expandSearchDemo', ['npdcCommon']).controller('ExpandSearchDemoCtrl', function($scope, NpdcAutocompleteConfigFactory) {
  $scope.options = new NpdcAutocompleteConfigFactory({
    showCollections: true,
    global: true,
    placeholder: "Search Norwegian Polar Data Centre"
  });

});
