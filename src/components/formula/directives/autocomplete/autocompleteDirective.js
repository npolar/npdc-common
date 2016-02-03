'use strict';

let autocompleteDirective = function ($http, formulaAutoCompleteService) {
  'ngInject';

  return {
    template: require('./autocomplete.html'),
    controller: function ($scope) {
      'ngInject';

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

      let mapItem = function (item, key) {
        let result = item;
        if (config[key]) {
          if (typeof config[key] === 'function') {
            result = config[key].apply({}, item);
          } else if (item[config[key]]) {
            result = item[config[key]];
          }
        }
        return result;
      };

      $scope.value = function (item) {
        return mapItem(item, 'value');
      };

      $scope.label = function (item) {
        return mapItem(item, 'label');
      };
    }
  };
};

module.exports = autocompleteDirective;
