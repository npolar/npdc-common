'use strict';

require('../../');
require('formula');
let angular = require('angular');

angular
  .module('formulaDemo', ['npdcCommon', 'formula'])
  .controller('FormulaCtrl', ($mdDialog, $scope, $timeout, formula, formulaAutoCompleteService,
    fileFunnelService, chronopicService, npdcAppConfig, NpolarApiResource) => {
    $scope.formula = formula.getInstance({
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      templates: npdcAppConfig.formula.templates.concat([
          {
            match: "people_item",
            template: '<npdc:formula-person></npdc:formula-person>'
          },
          {
            match: "gcmd",
            template: '<npdc:formula-gcmd></npdc:formula-gcmd>'
          },
          {
            match: "sciencekeywords_item",
            template: '<npdc:formula-gcmd-keyword></npdc:formula-gcmd-keyword>'
          },
          {
            match: "placenames_item",
            template: '<npdc:formula-placename></npdc:formula-placename>'
          },
          {
            match: "array_object2",
            template: '<npdc:formula-tabdata></npdc:formula-tabdata>'
          }
        ]),
        languages: npdcAppConfig.formula.languages.concat([{
          map: {
            fields: {
              string: {
                title: "Hoooooyoyo"
              },
              array_string_enum: {
                values: [
                  "heeeest", "katt"
                ]
              }
            }
          },
          code: 'en'
        }])
    });

    let updateModel = function() {
      $scope.formula.setModel({
        _id: 'foobarID',
        string: 'timeoutfoobar',
        string_date: '2012-05-17',
        boolean: true,
        array_object: [{
          string_default: 'one',
          number: 1
        },
        {
          string_default: 'two',
          number: 2
        },
        {
          string_default: 'three',
          number: 3
        },
        {
          string_default: 'four',
          number: 4
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
        }],
        autocomplete2: 'http://tjosho.com',
        links: [{
          rel: 'data',
          href: 'http://tjosho.com',
          title: 'Test file',
          length: 10,
          hash: ['hash'],
          type: 'mime/type'
        },
        {
          rel: 'other',
          href: 'http://tjosho22.com',
          title: 'Test link',
          length: 100,
          hash: ['hash2'],
          type: 'mime/type2'
        }]
      });
      console.log("timeout");
    };
    let acSource = ["Dalene", "Allan", "Lecia", "Leta", "Matthew", "Marlen", "Collette", "Alfredo", "Francina", "Dorene", "Ali", "Anette", "Courtney", "Arlena", "Spring", "Suzanna", "Roseanne", "Evita", "Gaynell", "Ellena", "Lucinda", "Delisa", "Lamont", "Eloy", "Luanna", "Cyndi", "Lynn", "Clare", "Stacey", "Tameka", "Cheryll", "Jong", "Hoyt", "Marhta", "Roselia", "Gala", "Chun", "Weston", "Zola", "Luana", "Arnette", "Delorse", "Libbie", "Nenita", "Lorina", "Carolyn", "Burma", "Russell", "Beatris", "Macie"];
    let acSourceFn = function (q) {
      return acSource.filter(item => item.toLowerCase().indexOf((q || '').toLowerCase()) === 0);
    };

    let acSource2 = [{a: "Anders", b: "http://tjosho.com"}, {a: "Remi", b: "http://lololo.no"}];
    let acSource2Fn = function (q) {
      return acSource2.filter(item => JSON.stringify(item).toLowerCase().indexOf((q || '').toLowerCase()) !== -1);
    };

    let Dataset = NpolarApiResource.resource({'path': '/dataset', 'resource': 'Dataset' });
    formulaAutoCompleteService.autocompleteFacets(['organisations.gcmd_short_name', 'links.type'], Dataset, $scope.formula);

    formulaAutoCompleteService.autocomplete({
      match: "autocomplete",
      querySource: acSourceFn,
      //label: 'key',
      //value: 'key',
      //onSelect,
      minLength: 1 //(default 0)
    }, $scope.formula);
    formulaAutoCompleteService.autocomplete({
      match: "autocomplete2",
      querySource: acSource2Fn,
      label: 'a',
      value: 'b',
      onSelect(item) {
        alert('Select: ' + item.a + ': ' + item.b);
      }
    }, $scope.formula);
    formulaAutoCompleteService.autocomplete({
      match: "autocomplete3",
      querySource: "//api.npolar.no/person/?fields=first_name,last_name,organisation,email&format=json&variant=array",
      label: "first_name",
      value: "first_name"
    }, $scope.formula);

    let fileToValueMapper = function (file) {
      return {
        rel: 'data',
        href: file.url,
        title: file.filename,
        length: file.file_size,
        hash: [file.md5sum],
        type: file.content_type
      };
    };

    let valueToFileMapper = function (value) {
      if (value.rel !== 'data') {
        return null;
      }
      return {
        filename: value.title,
        file_size: value.length,
        url: value.href,
        md5sum: value.hash[0]
      };
    };


    fileFunnelService.fileUploader({match(field) { return field.id === "links" && field.instance === "data";}, multiple: true, server: 'https://dbtest.data.npolar.no/dumpster', fileToValueMapper, valueToFileMapper, fields: ['rel']}, $scope.formula);
    chronopicService.defineOptions({match: '#/string_date', locale: 'ja', format: "{YYYY} {YY} {YYYY} {MMM} {DD} {MMMM}"});
    chronopicService.defineOptions({match: '#/string_datetime', locale: 'en'});

    $scope.demo2 = function () {
      $scope.formula.setForm('./demo/form2.json');
    };

    $scope.updateModel = updateModel;
  });
