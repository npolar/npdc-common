'use strict';

let autocompleteDirective = function (formulaAutoCompleteService) {
  'ngInject';

  return {
    template: require('./autocomplete.html'),
    scope: false,
    controller($scope) {
      let field = $scope.field;
      let config = formulaAutoCompleteService.getOptions(field);

      if (!config) {
        throw "Missing autocomplete config for "+field.path;
      }

      $scope.onSelect = config.onSelect;
      $scope.querySource = config.querySource;
      $scope.minLenght = config.minLenght || 0;

      $scope.searchText = '';

      $scope.value = function (item) {
        return config.value ? item[config.value] : item;
      };

      $scope.label = function (item) {
        return config.label ? item[config.label] : item;
      };
    }
  };
};

module.exports = autocompleteDirective;
