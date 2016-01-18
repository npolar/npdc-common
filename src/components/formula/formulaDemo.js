'use strict';

require('../../');
require('formula');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcCommon', 'formula'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $compile, $timeout, formulaAutoCompleteService,
    fileFunnelService, chronopicService) => {
    $scope.formula = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "material",
      hideButtons: false,
      templates: [
        {
          match(field) {
            return field.id === "people_object";
          },
          template: '<npdc:formula-person></npdc:formula-person>'
        },
        {
          match(field) {
            return field.id === "gcmd";
          },
          template: '<npdc:formula-gcmd></npdc:formula-gcmd>'
        },
        {
          match(field) {
            return field.id === "placenames_object";
          },
          template: '<npdc:formula-placename></npdc:formula-placename>'
        }
      ]
    };

    let updateModel = function() {
      $scope.formula.model = {
        _id: 'foobarID',
        string: 'timeoutfoobar',
        string_date: '2012-05-17',
        boolean: true,
        array_object: Array(100).fill({
          string_default: 'foo',
          number: 1
        }),
        array_string_enum: ['foo', 'qux'],
        array_string: ['foobar', 'bazquz'],
        ref_object: {
          name: 'test',
          email: 'foo',
          dn: 'no'
        },
        nested_array: [
          [1, 2],
          [1, 2]
        ],
        array_hierarchy: [{
          sub_array_one: [{
            sub_sub_array_one: [{
              obj_1_1_1: 'foo',
              obj_1_1_2: 4
            }]
          }]
        }]
      };
      console.log("timeout", $scope.formula.model.string);
    };
    $timeout(updateModel);

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

    formulaAutoCompleteService.bindSourceCallback("#/autocomplete_fn", fn);
    formulaAutoCompleteService.bindSourceCallback("#/autocomplete_url", emailCallback);
    fileFunnelService.defineOptions('#/string_file', {multiple: true});
    chronopicService.defineOptions('#/string_date', {locale: 'ja', format: "{YYYY} {YY} {YYYY} {MMM} {DD} {MMMM}"});
    chronopicService.defineOptions('#/string_datetime', {locale: 'en'});

  });
