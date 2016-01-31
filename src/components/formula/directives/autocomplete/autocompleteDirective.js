'use strict';

let autocompleteDirective = function ($http, formulaAutoCompleteService) {
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
      if (typeof config.querySource === 'string') {
        $scope.querySource = function (q) {
          var options = {
            params: {
              q: q || ''
            }
          };
          return $http.get(config.querySource, options).then(function (response) {
            return response.data.filter(item =>
              $scope.value(item).toLowerCase().indexOf(q.toLowerCase()) === 0);
          });
        };
      }
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
