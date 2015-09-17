'use strict';

// @ngInject
var DeleteButtonComponent = function ($scope, $mdDialog, NpolarApiSecurity) {
  $scope.security = NpolarApiSecurity;

  $scope.confirmDelete = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Confirm')
          .content('Are you sure you want to delete?')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancle');
    $mdDialog.show(confirm).then(function() {
      $scope.delete();
    }, function() {
      // noop
    });
  };
};

module.exports = DeleteButtonComponent;
