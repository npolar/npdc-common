'use strict';

let FileFunnel = require('filefunnel.js');
let angular = require('angular');
require('filefunnel.js/dist/js/filefunnel-i18n.min.js');

let ff = angular.module('filefunnel', ['ngMaterial', 'ngNpolar']);

ff.controller('FFUploadController', function($scope, $rootScope, $mdDialog, options, NpolarApiSecurity) {
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

  ff._elements.fileInput.on('change', (event) => {
    $rootScope.$broadcast('npdc-filefunnel-change', ff);
    $scope.$apply();
  });

  $scope.abort = function() {
    ff.abort();
    $mdDialog.hide();
  };

  $scope.upload = function() {
    ff.auth = NpolarApiSecurity.authorization();
    ff.upload();
    //$mdDialog.hide();
  };

  $scope.$on('npolar-lang', (e, lang) => {
    ff.locale = lang.lang;
  });

  // Success for each file
  ff.on('success', file => {

    $rootScope.$broadcast('npdc-filefunnel-upload-success', file);

    // Completed when all files are in
    if (ff.status === FileFunnel.status.COMPLETED) {
      $mdDialog.hide(ff.files);
      $rootScope.$broadcast('npdc-filefunnel-upload-completed', ff.files.filter((f,k) => typeof(k) === 'number'));
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

ff.service('fileFunnelService', function($mdDialog, formulaFieldConfig, NpolarMessage) {
  const DEFAULTS = {
    accept: "*/*",
    chunked: false,
    multiple: false,
    restricted: false
  };

  let configs = formulaFieldConfig.getInstance();
  let fileUploader = function(config, formula) {
    var options = Object.assign({}, DEFAULTS, config, { formula });
    if (!options.server) {
      throw "You must set a server!";
    }
    if (options.fromHashi) {
      options.fileToValueMapper = options.fromHashi;
    }
    if (!options.fileToValueMapper) {
      options.fileToValueMapper = function (file) {return file; };
    }
    if (!options.valueToFileMapper) {
      options.valueToFileMapper = function (value) {return value; };
    }

    configs.addConfig(options);
    formula.addTemplate({
      match: options.match,
      template: '<npdc:formula-file></npdc:formula-file>'
    });

  };

  let getOptions = function(field) {
    return configs.getMatchingConfig(field);
  };

  let handleOptions = function(options) {
    if (options.restricted) {
      let restricted = options.restricted;
      if (typeof options.restricted === "function") {
        restricted = options.restricted();
      }
      options.server += restricted ? '/restricted' : '';
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

      let responses = JSON.parse(files.xhr.response);
      responses.forEach(response => {

        // @TODO Handle out of sync metadata in backend
        if (response.status >= 200 && response.status < 300) {
          let value = options.fileToValueMapper(response);
          console.log('fromHashi', value);
          if (typeof value !== 'object') {
            throw "fileToValueMapper should return object with keys matching the fields you want to set file data to";
          }
          let item = field.itemAdd( /* preventValidation */ true);
          let valueModel = {};
          valueModel[item.id] = value;
          item.valueFromModel(valueModel);
          field.itemChange();

        } else {
          console.log('Hashi error:', response);
        }
      });

      return responses;
    });
  };

  return {
    fileUploader,
    getOptions,
    showUpload,
    status: FileFunnel.status
  };
});
