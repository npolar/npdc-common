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
    server: "http://apptest.data.npolar.no/_file",
    accept: "*/*",
    chunked: true,
    multiple: false
  };

  let configs = formulaFieldConfig.getInstance();
  let defineOptions = function (config, formula) {
    configs.addConfig(Object.assign({}, DEFAULTS, config));
    if (formula) {
      formula.addTemplate({
        match: config.match,
        template: '<npdc:formula-file></npdc:formula-file>'
      });
    }
  };

  let getOptions = function (field) {
    return configs.getMatchingConfig(field) || DEFAULTS;
  };

  let showUpload = function(ev, options) {
    return $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'FFUploadController',
      locals: {
        options: options
      },
      targetEvent: ev,
      template: require('./filefunnel.html')
    });
  };

  return {
    defineOptions,
    getOptions,
    showUpload,
    status: FileFunnel.status
  };
});

ff.directive('filefunnel', function(fileFunnelService) {
  return {
    restrict: 'A',
    controller($scope, $mdDialog) {
      let options = fileFunnelService.getOptions($scope.field);
      $scope.showUpload = function(ev, target) {
        fileFunnelService.showUpload(ev, options)
          .then(files => {
            if (target[0] instanceof HTMLInputElement) {
              target[0].value = options.server + files[0].location;
            } else if ($scope.field) {
              $scope.field.fields.forEach(field => {
                switch (field.id) {
                  case 'uri':
                    field.value = options.server + files[0].location;
                    break;
                  case 'filename':
                    field.value = files[0].reference.name;
                    break;
                  case 'filesize':
                    field.value = files[0].reference.size;
                    break;
                  case 'mimetype':
                    field.value = files[0].reference.type;
                    break;
                  default:
                    // noop
                }
                field.readonly = true;
              });

              if ($scope.field.itemAdd) {
                let oldItemAdd = $scope.field.itemAdd;
                $scope.field.itemAdd.itemAdd = function (ev) {
                  fileFunnelService.showUpload(ev, options).then(files => {
                    files.forEach(file => {
                      if (file.status !== fileFunnelService.status.COMPLETED) {
                        return;
                      }
                      let newItem = oldItemAdd.call($scope.field);
                      newItem.fields.forEach(field => {
                        switch (field.id) {
                          case 'uri':
                            field.value = options.server + file.location;
                            break;
                          case 'filename':
                            field.value = file.reference.name;
                            break;
                          case 'filesize':
                            field.value = file.reference.size;
                            break;
                          case 'mimetype':
                            field.value = file.reference.type;
                            break;
                          default:
                            // noop
                        }
                        field.readonly = true;
                      });
                    });
                  });
                };
              }
            }
          });
      };
    },
    link(scope, element, attrs) {
      element.bind('click', function(ev) {
        scope.showUpload(ev, element);
      });
    }
  };
});
