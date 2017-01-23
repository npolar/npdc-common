'use strict';

let autocompleteDirective = function ($http, $q, formulaAutoCompleteService) {
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

          if (typeof config.onSelect === 'function') {
            config.onSelect(item);
          }
        }
      };

      let querySource = function (q = '') {
        let deferred = $q.defer();
        if (typeof config.querySource === 'function') {
          deferred.resolve(config.querySource(q));
        } else if (typeof config.querySource === 'string') {
          let options = {
            params: {
              q,
              variant: 'array',
              limit: 100,
              fields: '*'
            },
            headers: {
              Accept: 'application/json, application/geo+json'
            },
            isArray: true,
            cache: true
          };
          $http.get(config.querySource, options).then(function (response) {
            deferred.resolve(response.data);
          });
        } else if (config.querySource instanceof Array) {
          deferred.resolve(config.querySource.filter(item =>
            $scope.label(item).toLowerCase().indexOf(q.toLowerCase()) === 0));
        }
        return deferred.promise;
      };

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

      $scope.search = {
        text: ''
      };

      $scope.value = function (item) {
        return mapItem(item, 'value');
      };

      $scope.label = function (item) {
        return mapItem(item, 'label');
      };

      $scope.items = querySource(field.value);

      $scope.items.then(items => {
        let item = items.find(item => $scope.value(item) === field.value);
        $scope.search.text = item ? $scope.label(item) : field.value || '';
      });

      let isExactMatch = function (item, searchText = '') {
        if (typeof searchText === 'number') {
          return $scope.label(item).toLowerCase() === searchText.toString().toLowerCase();
        }
        return $scope.label(item).toLowerCase() === searchText.toLowerCase();
      };

      $scope.searchChange = function(searchText) {
        $scope.items = querySource(searchText);

        $scope.items.then(items => {
          if (items.length === 1 && isExactMatch(items[0], searchText)) {
            $scope.onSelect(items[0]);
          } else {
            field.value = searchText;
          }
        });
      };
    }
  };
};

module.exports = autocompleteDirective;
