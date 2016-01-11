'use strict';

/**
 * @ngInject
 */
var formula = function (formulaAutoCompleteService) {

  var onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
  };

  return {
    templateUrl: 'npdc-common/src/components/formula/custom-templates/person.html',
    //@ngInject
    controller($scope) {
      $scope.firstName = $scope.field.fields.find(field => field.id === 'first_name');
      $scope.lastName = $scope.field.fields.find(field => field.id === 'last_name');
      $scope.organisation = $scope.field.fields.find(field => field.id === 'organisation');
      $scope.email = $scope.field.fields.find(field => field.id === 'email');

      let matched = [];
      let overrideSource = [];

      formulaAutoCompleteService.bindSourceCallback($scope.firstName.path, function(persons) {
        if (overrideSource.length > 0) {
          persons = overrideSource;
        }
        matched = persons;
        return persons.map(person => person.first_name).filter(onlyUnique);
      });

      formulaAutoCompleteService.bindSourceCallback($scope.lastName.path, function(persons) {
        if (overrideSource.length > 0) {
          persons = overrideSource;
        }
        matched = persons;
        return persons.map(person => person.last_name).filter(onlyUnique);
      });

      formulaAutoCompleteService.bindSelectCallback($scope.firstName.path, function(value) {
        let matches = matched.filter(person => person.first_name === value);
        if (matches.length === 1) {
          $scope.lastName.value = matches[0].last_name;
          $scope.organisation.value = matches[0].organisation;
          $scope.email.value = matches[0].email;
        } else {
          overrideSource = matches;
        }
      });

      formulaAutoCompleteService.bindSelectCallback($scope.lastName.path, function(value) {
        let matches = matched.filter(person => person.last_name === value);
        if (matches.length === 1) {
          $scope.firstName.value = matches[0].first_name;
          $scope.organisation.value = matches[0].organisation;
          $scope.email.value = matches[0].email;
        } else {
          overrideSource = matches;
        }
      });

      $scope.otherFields = $scope.field.fields.filter(field => !['first_name', 'last_name', 'email', 'organisation'].includes(field.id));
    }
  };
};

module.exports = formula;
