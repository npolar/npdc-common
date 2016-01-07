'use strict';

require('../../');
require('formula');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcCommon', 'formula'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $compile, $timeout, formulaAutoCompleteService,
    fileFunnelService, chronopicService) => {
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

    let updateModel = function() {
      $scope.formulaData.model = {
        _id: 'foobarID',
        string: 'timeoutfoobar',
        string_date: '2012-05-17',
        boolean: true,
        array_object: [{
          string_default: 'foo',
          number: 1
        }, {
          string_default: 'bar',
          number: 2
        }],
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
      console.log("timeout", $scope.formulaData.model.string);
    };
    $timeout(updateModel, 1000);

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
    fileFunnelService.defineOptions('#/string_file', {multiple: true});
    chronopicService.defineOptions('#/string_date', {locale: 'ja'});

  });
