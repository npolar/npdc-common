'use strict';

let FileFunnel = require('filefunnel.js');
let angular = require('angular');
require('filefunnel.js/dist/js/filefunnel-i18n.min.js');

let ff = angular.module('filefunnel', ['ngMaterial', 'ngNpolar']);

ff.controller('FFUploadController', function($scope, $mdDialog, options) {
  let ff = new FileFunnel(null, options);
  $scope.ff = ff;

  if (!Object.keys(options).includes('restricted')) {
    $scope.askForScope = true;
    $scope.access = {
      data: true
    };
    $scope.$watch('access.data', access => {
      if (access) {
        ff.server = ff.server.replace('/restricted/', '/');
      } else {
        ff.server = ff.server.replace(/\/$/, '') + '/restricted/';
      }
    });
  }

  if (/:id/.test(options.server)) {
    if (options.formula) {
      let model = options.formula.getModel();
      ff.server = ff.server.replace(':id', model.id || model._id);
    } else {
      throw "Server needs a document id to be able to upload files.";
    }
  }

  ff._elements.fileInput.on('change', () => {
    $scope.$apply();
  });

  $scope.abort = function () {
    ff.abort();
    $mdDialog.hide();
  };

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

ff.service('fileFunnelService', function($mdDialog, formulaFieldConfig, NpolarApiSecurity) {
  const DEFAULTS = {
    accept: "*/*",
    chunked: false,
    multiple: false
  };

  let configs = formulaFieldConfig.getInstance();
  let fileUploader = function (config, formula) {
    var options = Object.assign({}, DEFAULTS, config, {formula, auth: NpolarApiSecurity.authorization()});
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

  let handleOptions = function (options) {
    if (!options || !options.server) {
      throw "You must set a server in options!";
    }

    if (options.restricted) {
      options.server += '/restricted';
    }
  };

  let showUpload = function(ev, field, options) {
    handleOptions(options);
    return $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'FFUploadController',
      locals: {
        options: options
      },
      targetEvent: ev,
      template: require('./filefunnel.html')
    }).then(files => {
      if (!files) {
        return;
      }
      let response = JSON.parse(files.xhr.response)[0];

      if (typeof options.successCallback === "function") {
        let fieldValues = options.successCallback.call({}, response);
        if (field.typeOf('array') || field.typeOf('object')) {
          if (typeof fieldValues !== 'object') {
            throw "successCallback should return object with keys matching the fields you want to set file data to";
          }
          let theField = field.typeOf('array') ? field.itemAdd(/* preventValidation */ true) : field;
          let valueModel = {};
          valueModel[theField.id] = fieldValues;
          theField.valueFromModel(valueModel);
          field.itemChange();
        } else {
          field.value = fieldValues || field.value;
        }
      }
      return response;
    });
  };

  return {
    fileUploader,
    getOptions,
    showUpload,
    status: FileFunnel.status
  };
});
