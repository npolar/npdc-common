'use strict';

let fileDirective = function($http, fileFunnelService) {
  'ngInject';

  return {
    template: require('./file.html'),
    scope: false,
    controller($scope, $mdDialog) {
      'ngInject';

      // let file = {
      //   content_type: "application/octet-stream",
      //   file_size: 23713,
      //   filename: "IE11 - Win7.vbox-prev",
      //   id: "54a4ce4d-b0f5-f103-c7f1-309529ecf81c",
      //   md5sum: "ad3b5deb59195f710ea2d4a36ba606c8",
      //   modified: "2016-02-19T14:36:56Z",
      //   status: 409,
      //   url: "https://dbtest.data.npolar.no/dumpster/54a4ce4d-b0f5-f103-c7f1-309529ecf81c",
      // };

      $scope.files = [];
      let options = fileFunnelService.getOptions($scope.field);

      let mapFile = function(value) {
        let file = Object.assign({},value.value);
        if (typeof options.valueToFileMapper === "function") {
          file = options.valueToFileMapper(file);
        }

        if (file) {
          if (!file.filename || !file.url) {
            throw "File should be object with keys filename, url, [file_size, icon, extras].";
          }
          file.extras = value.fields.filter(field => (options.fields || []).includes(field.id));
        }
        return file;
      };

      $scope.field.values.forEach(value => {
        let file = mapFile(value);
        $scope.files.push(file);
      });

      $scope.isFile = function(value, index, array) {
        return !!$scope.files[index];
      };

      $scope.showUpload = function(ev) {
        fileFunnelService.showUpload(ev, $scope.field, options).then(files => {
          files.forEach(file => {
            let length = $scope.files.push(file);
            file.extras = $scope.field.values[length - 1].fields.filter(field => (options.fields || []).includes(field.id));
          });
        });
      };

      $scope.removeFile = function(index) {
        let file = $scope.field.itemRemove(index);
        if (typeof options.valueToFileMapper === "function") {
          file = options.valueToFileMapper(file);
        }
        $http.delete(file.url);
      };

      $scope.nrFiles = function () {
        return $scope.files.filter(f => !!f).length;
      };
    }
  };
};

module.exports = fileDirective;
