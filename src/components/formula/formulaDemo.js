'use strict';

require('../../');
require('formula');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcCommon', 'formula'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $compile, $timeout, formula, formulaAutoCompleteService,
    fileFunnelService, chronopicService, npolarApiConfig) => {
    $scope.formula = new formula({
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      templates: npolarApiConfig.formula.templates.concat(
        [
          {
            match: "people_object",
            template: '<npdc:formula-person></npdc:formula-person>'
          },
          {
            match: "gcmd",
            template: '<npdc:formula-gcmd></npdc:formula-gcmd>'
          },
          {
            match: "sciencekeywords_object",
            template: '<npdc:formula-gcmd-keyword></npdc:formula-gcmd-keyword>'
          },
          {
            match: "placenames_object",
            template: '<npdc:formula-placename></npdc:formula-placename>'
          },
          {
            match: "array_object2",
            template: '<npdc:formula-tabdata></npdc:formula-tabdata>'
          },
          {
            match: "autocomplete",
            template: '<npdc:formula-autocomplete></npdc:formula-autocomplete>'
          },
          {
            match: "string_file",
            template: '<npdc:formula-file></npdc:formula-file>'
          },
          {
            match: "file_ref",
            template: '<npdc:formula-file-object></npdc:formula-file-object>'
          }
        ]
      ),
      hideButtons: false
    });

    let updateModel = function() {
      $scope.formula.setModel({
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
      });
      console.log("timeout");
    };
    $timeout(updateModel);

    let fn = function (q) {
      return ["Dalene", "Allan", "Lecia", "Leta", "Matthew", "Marlen", "Collette", "Alfredo", "Francina", "Dorene", "Ali", "Anette", "Courtney", "Arlena", "Spring", "Suzanna", "Roseanne", "Evita", "Gaynell", "Ellena", "Lucinda", "Delisa", "Lamont", "Eloy", "Luanna", "Cyndi", "Lynn", "Clare", "Stacey", "Tameka", "Cheryll", "Jong", "Hoyt", "Marhta", "Roselia", "Gala", "Chun", "Weston", "Zola", "Luana", "Arnette", "Delorse", "Libbie", "Nenita", "Lorina", "Carolyn", "Burma", "Russell", "Beatris", "Macie"];
    };

    // formulaAutoCompleteService.bindSourceCallback("#/autocomplete", fn);
    // fileFunnelService.defineOptions('#/string_file', {multiple: true});
    // chronopicService.defineOptions('#/string_date', {locale: 'ja', format: "{YYYY} {YY} {YYYY} {MMM} {DD} {MMMM}"});
    // chronopicService.defineOptions('#/string_datetime', {locale: 'en'});

  });
