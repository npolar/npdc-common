'use strict';

// @ngInject
var DeleteButtonComponent = function ($scope, $mdDialog, NpolarApiSecurity) {
  $scope.security = NpolarApiSecurity;

  $scope.confirmDelete = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('DELETE')
      .content('Are you sure you want to delete?')
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
