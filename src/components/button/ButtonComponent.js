'use strict';

var DeleteButtonComponent = function ($scope, $mdDialog, NpolarApiSecurity) {
  'ngInject';

  $scope.security = NpolarApiSecurity;

  $scope.confirmDelete = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('DELETE')
      .textContent('Are you sure you want to delete?')
      .targetEvent(ev)
      .ok('Delete')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      $scope.delete();
    }, function() {
      // noop
    });
  };
};

module.exports = DeleteButtonComponent;
