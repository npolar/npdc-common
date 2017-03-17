'use strict';

function FormulaFileController($scope, $mdDialog, $http, $routeParams, NpolarApiSecurity, fileFunnelService) {
  'ngInject';

  let ctrl = this;

  ctrl.field = $scope.field;

  ctrl.isNew = (params=$routeParams) => {
    return params.id === '__new';
  };

  ctrl.file_uri = (options=fileFunnelService.getOptions(ctrl.field)) => {
    return options.server.replace('/:id/_file', '');
  };

  ctrl.canUpload = (security = NpolarApiSecurity) => {
    return ((false === ctrl.isNew()) && (security.isAuthorized('create', ctrl.file_uri())));
  };

  ctrl.canDelete = (security = NpolarApiSecurity) => {
    return security.isAuthorized('delete', ctrl.file_uri());
  };

  $scope.files = [];
  let options = fileFunnelService.getOptions($scope.field);
  //console.log('field', $scope.field, fileFunnelService.getOptions(), options);

  // From app-specific metadata to Hashi object
  let toHashi = function(hashi_field) {

    // file: metadata object as stored in the application
    let file = Object.assign({},hashi_field.value);

    if (typeof options.toHashi === "function") {
      file = options.toHashi(file);
      options.valueToFileMapper = options.toHashi;
    } else if (typeof options.valueToFileMapper === "function") {
      console.warn('DEPRECATED: use toHashi');
      file = options.valueToFileMapper(file);
    }
    if (file) {
      if (!file.filename || !file.url) {
        throw "The hashi file mapper should be an object with keys filename, url, [file_size, icon, extras].";
      }
      file.extras = hashi_field.fields.filter(field => (options.fields || []).includes(field.id));
    }
    return file;
  };

  $scope.id = $routeParams.id;

  $scope.field.values.forEach(value => {
    let hashiFile = toHashi(value);
    $scope.files.push(hashiFile);
  });

  $scope.isFile = function(value, index, array) {
    return !!$scope.files[index];
  };

  ctrl.displayUploadDialog = (ev) => {
    console.log('displayUploadDialog', ev);
    fileFunnelService.showUpload(ev, $scope.field, options).then(files => {

      files = files.filter(f => f.status >= 200 && f.status < 300);

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