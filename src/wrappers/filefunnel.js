'use strict';

let FileFunnel = require('filefunnel.js');
let angular = require('angular');
require('filefunnel.js/dist/js/filefunnel-i18n.min.js');

let ff = angular.module('filefunnel', ['ngMaterial']);

ff.controller('FFUploadController', function($scope, $mdDialog, options) {
  let ff = new FileFunnel(null, options);
  $scope.ff = ff;

  ff._elements.fileInput.on('change', () => {
    $scope.$apply();
  });

  $scope.$on('npolar-lang', (e, lang) => {
      ff.locale = lang.lang;
  });

  ff.on('success', file => {
    if (ff.status === FileFunnel.status.COMPLETED) {
      $mdDialog.hide(ff.files);
    }
  }).on('error', file => {
    ff.progressType = 'determinate';
	$scope.$apply();
  }).on('progress', file => {
    ff.progressType = 'determinate';
  }).on('start', file => {
    ff.progressType = 'indeterminate';
  });

  $scope.FileFunnelStatus = FileFunnel.status;
  ff.progressType = 'determinate';
});

ff.service('fileFunnelService', function($mdDialog, formulaFieldConfig) {
  const DEFAULTS = {
    accept: "*/*",
    chunked: false,
    multiple: false
  };

  let configs = formulaFieldConfig.getInstance();
  let defineOptions = function (config, formula) {
    var options = Object.assign({}, DEFAULTS, config);
    if (!options.server) {
      throw "You must set a server!";
    }
    configs.addConfig(options);
    if (formula) {
      formula.getFields().then(fields => {
        var field = fields.find(field => configs.isMatch(field, config));
        if (field.typeOf('array') || field.typeOf('object')) {
          if (!config.successCallback) {
            throw "You really need a successCallback to do something useful...";
          }
        } else {
          if (!config.successCallback) {
            config.successCallback = function (file) {
              return file.url;
            };
          }
        }

        formula.addTemplate({
          match: config.match,
          template: '<npdc:formula-file></npdc:formula-file>'
        });
      });
    }
  };

  let getOptions = function (field) {
    return configs.getMatchingConfig(field);
  };

  let showUpload = function(ev, field, options) {
    if (!options || !options.server) {
      throw "You must set a server in options!";
    }
    return $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'FFUploadController',
      locals: {
        options: options
      },
      targetEvent: ev,
      template: require('./filefunnel.html')
    }).then(files => {
      let response = JSON.parse(files.xhr.response)[0];
      if (typeof options.successCallback === "function") {
        let fieldValues = options.successCallback.call({}, response);
        if (field.typeOf('array') || field.typeOf('object')) {
          if (typeof fieldValues !== 'object') {
            throw "successCallback should return object with keys matching the fields you want to set file data to";
          }
          let theField = field.typeOf('array') ? field.itemAdd() : field;

          theField.fields.forEach(field => {
            field.value = fieldValues[field.id] || field.value;
          });
        } else if (field.typeOf('field')) {
          field.value = fieldValues || field.value;
        }
      }
      return response;
    });
  };

  return {
    defineOptions,
    getOptions,
    showUpload,
    status: FileFunnel.status
  };
});
