'use strict';

require('../../');
require('formula');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcCommon', 'formula'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $compile, formulaAutoCompleteService) => {
    $scope.formulaData = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "material",
      hideButtons: false,
      templates: [
        {
          match(field) {
            return field.id === "ref_object";
          },
          template: require('./demo/customObject.html')
        }
      ]
    };

    let fn = function (q) {
      return ["Dalene", "Allan", "Lecia", "Leta", "Matthew", "Marlen", "Collette", "Alfredo", "Francina", "Dorene", "Ali", "Anette", "Courtney", "Arlena", "Spring", "Suzanna", "Roseanne", "Evita", "Gaynell", "Ellena", "Lucinda", "Delisa", "Lamont", "Eloy", "Luanna", "Cyndi", "Lynn", "Clare", "Stacey", "Tameka", "Cheryll", "Jong", "Hoyt", "Marhta", "Roselia", "Gala", "Chun", "Weston", "Zola", "Luana", "Arnette", "Delorse", "Libbie", "Nenita", "Lorina", "Carolyn", "Burma", "Russell", "Beatris", "Macie"];
    };

    let emailCallback = function (response) {
      let emails = [];
      response.forEach(entry => {
        entry.people.forEach(person => {
          emails.push(person.email);
        });
      });
      return emails;
    };

    formulaAutoCompleteService.defineSourceFunction("foobar", fn);
    formulaAutoCompleteService.defineSourceFunction("emailCallback", emailCallback);

  });
