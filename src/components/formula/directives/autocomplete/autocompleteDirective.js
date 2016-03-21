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

      $scope.onSelect = function (item) {
        if (item) {
          field.value = $scope.value(item);
        }
        if (typeof config.onSelect === 'function') {
          config.onSelect(item);
        }
      };

      let querySource = config.querySource;
      if (typeof config.querySource === 'string') {
        querySource = function (q = '') {
          let options = {
            params: {
              q,
              variant: 'array',
              limit: 100,
              fields: '*'
            },
            headers: {
              Accept: 'application/json, application/vnd.geo+json'
            },
            isArray: true,
            cache: true
          };
          return $http.get(config.querySource, options).then(function (response) {
            return response.data;
          });
        };
      } else if (config.querySource instanceof Array) {
        querySource = function (q = '') {
          return config.querySource.filter(item =>
            $scope.label(item).toLowerCase().indexOf(q.toLowerCase()) === 0);
        };
      }
      $scope.minLength = config.minLength || 0;

      let mapItem = function (item, key) {
        let result = item;
        if (config[key]) {
          if (typeof config[key] === 'function') {
            result = config[key].apply({}, item);
          } else if (item[config[key]]) {
            result = item[config[key]];
          }
        }
        return String(result);
      };

      $scope.search = {};

      $scope.value = function (item) {
        return mapItem(item, 'value');
      };

      $scope.label = function (item) {
        return mapItem(item, 'label');
      };

      $scope.items = querySource(field.value);

      if ($scope.items.$$state) {
        $scope.items.then(items => {
          let item = items.find(item => $scope.value(item) === field.value);
          $scope.search.text = item ? $scope.label(item) : field.value;
        });
      } else {
        $scope.search.text = $scope.items.length === 1 ? $scope.label($scope.items[0]) : field.value;
      }
      $scope.searchChange = function(searchText) {
        if (searchText) {
          field.value = searchText;
          $scope.items = querySource(searchText);
        }
      };
    }
  };
};

module.exports = autocompleteDirective;
