'use strict';

let FileFunnel = require('filefunnel.js');
let angular = require('angular');

let ff = angular.module('filefunnel', ['ngMaterial']);

ff.controller('FFUploadController', function($scope, $mdDialog, options) {
  let ff = new FileFunnel(null, options);
  $scope.ff = ff;

  ff._elements.fileInput.on('change', () => {
    $scope.$apply();
  });

  ff.on('success', file => {
    if (ff.status === FileFunnel.status.COMPLETED) {
      $mdDialog.hide(ff.files);
    }
  }).on('error', file => {
    // noop
  }).on('progress', file => {
    // noop
  });

  $scope.isDisabled = function() {
    return ff.files.length === 0;
  };

});

ff.service('FileFunnelService', function($mdDialog) {
  let options = {
    server: "http://apptest.data.npolar.no/_file",
    accept: "*/*",
    chunked: true
  };

  let showUpload = function(ev) {
    return $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'FFUploadController',
      locals: {
        options
      },
      targetEvent: ev,
      template: require('./filefunnel.html')
    });
  };

  return {
    options,
    showUpload,
    status: FileFunnel.status
  };
});

ff.directive('filefunnel', function(FileFunnelService) {
  return {
    restrict: 'A',
    //@ngInject
    controller($scope, $mdDialog) {
      $scope.showUpload = function(ev, target) {
        FileFunnelService.showUpload(ev)
          .then(files => {
            if (target[0] instanceof HTMLInputElement) {
              target[0].value = FileFunnelService.options.server + files[0].location;
            } else if ($scope.field) {
              $scope.field.fields.forEach(field => {
                switch (field.id) {
                  case 'uri':
                    field.value = FileFunnelService.options.server + files[0].location;
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
                  FileFunnelService.showUpload(ev, {multiple: true}).then(files => {
                    files.forEach(file => {
                      if (file.status !== FileFunnelService.status.COMPLETED) {
                        return;
                      }
                      let newItem = oldItemAdd.call($scope.field);
                      newItem.fields.forEach(field => {
                        switch (field.id) {
                          case 'uri':
                            field.value = FileFunnelService.options.server + file.location;
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
