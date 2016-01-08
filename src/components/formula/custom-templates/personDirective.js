'use strict';

/**
 * @ngInject
 */
var formula = function (formulaAutoCompleteService) {
  return {
    templateUrl: 'npdc-common/src/components/formula/custom-templates/person.html',
    //@ngInject
    controller($scope) {
      formulaAutoCompleteService.defineSourceFunction('npdcFirstName', function(persons) {
        return persons.map(person => person.first_name);
      });

      formulaAutoCompleteService.defineSourceFunction('npdcLastName', function(persons) {
        return persons.map(person => person.last_name);
      });

    }
  };
};

module.exports = formula;
