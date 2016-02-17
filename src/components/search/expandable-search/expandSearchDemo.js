'use strict';

require('../../');
let angular = require('angular');

angular.module('expandSearchDemo', ['npdcCommon']).controller('ExpandSearchDemoCtrl',
  function($scope, NpdcAutocompleteConfigFactory, NpolarTranslate) {
  $scope.options = new NpdcAutocompleteConfigFactory({
    showCollections: true,
    global: true,
    placeholder: NpolarTranslate.translate('search') + ' ' + NpolarTranslate.translate('NPDC')
  });

});
