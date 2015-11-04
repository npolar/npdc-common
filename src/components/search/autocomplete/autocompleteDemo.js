'use strict';

require('../../../');
let angular = require('angular');

let demo = angular.module('autocompleteDemo', ['npdcUi', 'templates']);

demo.controller('demoCtrl', ($scope, NpolarApiSecurity, NpdcAutocompleteConfigFactory) => {
  let options = {showCollections: true};
  $scope.options = new NpdcAutocompleteConfigFactory(options);
});
