'use strict';

let person = function ($q, NpolarApiResource) {
  'ngInject';

  // rolesList
  let Person = NpolarApiResource.resource({ path: '/person', resource: 'Person' });
  let query = { 'fields': 'first_name,last_name,organisation,email', 'variant': 'array', 'limit': 200 };


  return {
    template: require('./person.html'),
    controller($scope) {
      'ngInject';

      //@todo handle affiliation (multiple)
      $scope.firstName = $scope.field.fields.find(field => field.id === 'first_name');
      $scope.lastName = $scope.field.fields.find(field => field.id === 'last_name');
      $scope.organisation = $scope.field.fields.find(field => field.id === 'organisation');
      $scope.email = $scope.field.fields.find(field => field.id === 'email');
      let homepage = $scope.field.fields.find(field => field.id === 'homepage');
      if (homepage) {
        $scope.homepage = homepage;
      }

      $scope.querySearch = function (searchText, field) {
        let deferred = $q.defer();
        let fullQuery = Object.assign({}, query, { q: searchText });
        Person.array(fullQuery, response => {
          let fieldFilteredMatches = response.filter(person => {
            return (person[field] || '').toLowerCase().indexOf(searchText.toLowerCase()) === 0;
          });
          deferred.resolve(fieldFilteredMatches);
        }, err => { deferred.reject(); });
        return deferred.promise;
      };

      $scope.onSelect = function(person) {
        $scope.firstName.value = person.first_name;
        $scope.lastName.value = person.last_name;
        $scope.organisation.value = person.organisation;
        $scope.email.value = person.email;
        let id = person.email.split('@')[0];
        $scope.homepage.value = `http://www.npolar.no/en/people/${id}`;
      };

      $scope.otherFields = $scope.field.fields.filter(field => !['first_name', 'last_name', 'email', 'id', 'affiliation'].includes(field.id));
    }
  };
};

module.exports = person;
