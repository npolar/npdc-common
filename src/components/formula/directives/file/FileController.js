'use strict';

function FormulaFileController($scope, $mdDialog, $http, $routeParams, NpolarApiSecurity, fileFunnelService) {
  'ngInject';

  let ctrl = this;

  ctrl.field = $scope.field;

  ctrl.isNew = (params=$routeParams) => {
    return params.id === '__new';
  };

  ctrl.canUpload = (security = NpolarApiSecurity, options=fileFunnelService.getOptions(ctrl.field)) => {
    return (false === ctrl.isNew() && security.isAuthorized('create', options.server));
  };

  ctrl.canDelete = (security = NpolarApiSecurity, options=fileFunnelService.getOptions(ctrl.field)) => {
    return security.isAuthorized('delete', options.server);
  };

  $scope.files = [];
  let options = fileFunnelService.getOptions($scope.field);
  //console.log('field', $scope.field, fileFunnelService.getOptions(), options);

  let mapFile = function(link_field) {
    let file = Object.assign({},link_field.value);

    if (typeof options.valueToFileMapper === "function") {
      file = options.valueToFileMapper(file);
    }

    if (file) {
      if (!file.filename || !file.url) {
        throw "The hashi file mapper should be an object with keys filename, url, [file_size, icon, extras].";
      }
      file.extras = link_field.fields.filter(field => (options.fields || []).includes(field.id));
    }
    return file;
  };

  $scope.id = $routeParams.id;

  $scope.field.values.forEach(value => {
    let file = mapFile(value);
    $scope.files.push(file);
  });

  $scope.isFile = function(value, index, array) {
    return !!$scope.files[index];
  };

  ctrl.displayUploadDialog = (ev) => {
    console.log('displayUploadDialog', ev);
    fileFunnelService.showUpload(ev, $scope.field, options).then(files => {
      if (files) {
        files.forEach(file => {
          let length = $scope.files.push(file);
          file.extras = $scope.field.values[length - 1].fields.filter(field => (options.fields || []).includes(field.id));
        });
      }
    });
  };

  $scope.removeFile = function(index) {
    let file = $scope.field.itemRemove(index);
    if (typeof options.valueToFileMapper === "function") {
      file = options.valueToFileMapper(file.value);
    }
    $scope.files = $scope.files.filter(f => f.md5sum !== file.md5sum);
    $http.delete(file.url);
  };

  $scope.nrFiles = function () {
    return $scope.files.filter(f => !!f).length;
  };
}

module.exports = FormulaFileController;