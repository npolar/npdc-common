'use strict';

let placename = function($q, $resource, npolarCountryService) {
  'ngInject';

  let Placename = $resource('http://placenames.npolar.no/stadnamn.json', {callback: "JSON_CALLBACK"}, { array: { method: 'JSONP', isArray: true }});
  let query = { 'rows': 20, 'approved': true };

  // First term is official, rest is mappings
  const AREAS = [{
    "terms": ["Svalbard"]
  }, {
    "terms": ["Dronning Maud Land"]
  }, {
    "terms": ["Jan Mayen"]
  }, {
    "terms": ["Antarctica", "Antarktis"]
  }, {
    "terms": ["Bouvetøya"]
  }, {
    "terms": ["Peter I Øy", "Peter 1 Øy"]
  }, {
    "terms": ["Arctic", "Arktis"]
  }, {
    "terms": ["Arctic Ocean"]
  },
  {
    "terms": ["Barents Sea"]
  }, {
    "terms": ["Southern Ocean", "Antarctic Ocean"]
  }, {
    "terms": ["Other"] // Other...
  }];

  const COUNTRIES = {
    'USA': 'United States'
  };

  // dataset
  // placenames[{area,placename,country}]

  // publication
  // locations[{area,placename,country,(hemisphere,latitude,longitude)}]


  return {
    template: require('./placename.html'),
    controller($scope) {
      'ngInject';

      $scope.area = $scope.field.fields.find(field => field.id === 'area');
      $scope.placename = $scope.field.fields.find(field => field.id === 'placename');
      $scope.country = $scope.field.fields.find(field => field.id === 'country');
      $scope.countrySearchText = '';
      $scope.selectedCountryItem = null;

      $scope.querySearchPlacenames = function (searchText) {
        return Placename.array(Object.assign({}, query, { q: searchText })).$promise;
      };

      $scope.onSelectPlacename = function(placename) {
        if (!placename) {
          return;
        }
        $scope.area.value = placename.location;
        placename.country = COUNTRIES[placename.country] || placename.country;
        $scope.selectedCountryItem = npolarCountryService.countryByName(placename.country);
      };

      $scope.querySearchCountries = function (searchText) {
        return npolarCountryService.countriesByQuery(searchText);
      };

      $scope.area.values = AREAS.map(area => ({ id: area.terms[0], label: area.terms[0] }));
      if ($scope.area.value && !$scope.area.values.some(val => val.id.toLowerCase() === $scope.area.value.toLowerCase())) {
        // value is set but doesn't match any value in AREAS
        $scope.area.value = AREAS.reduce((memo, area) => {
          if (area.terms.some(term => term.toLowerCase() === $scope.area.value.toLowerCase())) {
            return area.terms[0];
          } else {
            return 'Other';
          }
        });
      }

      if ($scope.country.value) {
        $scope.selectedCountryItem = npolarCountryService.countryByCode($scope.country.value);
      }

      $scope.otherFields = $scope.field.fields.filter(field => !['area', 'placename', 'country'].includes(field.id));
    }
  };
};

module.exports = placename;
