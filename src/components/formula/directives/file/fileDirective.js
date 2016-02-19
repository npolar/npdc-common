'use strict';

let fileDirective = function($http, fileFunnelService) {
  'ngInject';

  return {
    template: require('./file.html'),
    scope: false,
    controller($scope, $mdDialog) {
      'ngInject';

      let file = {
        content_type: "application/octet-stream",
        file_size: 23713,
        filename: "IE11 - Win7.vbox-prev",
        id: "54a4ce4d-b0f5-f103-c7f1-309529ecf81c",
        md5sum: "ad3b5deb59195f710ea2d4a36ba606c8",
        modified: "2016-02-19T14:36:56Z",
        status: 409,
        url: "https://dbtest.data.npolar.no/dumpster/54a4ce4d-b0f5-f103-c7f1-309529ecf81c",
      };
      $scope.files = [file];

      let options = fileFunnelService.getOptions($scope.field);
      $scope.showUpload = function(ev) {
        fileFunnelService.showUpload(ev, $scope.field, options)
          .then(file => {
            $scope.files.push(file);
          });
      };

      $scope.removeFile = function (index) {
        let file = $scope.files.splice(index, 1)[0];
        if ($scope.field.typeOf('array')) {
          $scope.field.itemRemove(index);
        }

        $http.delete(file.url);
      };
    }
  };
};

module.exports = fileDirective;
