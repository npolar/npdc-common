'use strict';

/**
 * @ngInject
 */
var formula = function ($mdDialog, npdcAppConfig) {
  return {
    templateUrl: 'npdc-common/src/components/formula/edit.html',
    //@ngInject
    controller($scope) {

      let initBottomSheet = function () {
        $scope.bottomSheetOptions = {
          items: [],
          alwaysShow: false
        };
        if ($scope.security.isAuthorized('delete', $scope.resource.path) && $scope.document._rev) {
          $scope.bottomSheetOptions.items.push({
            name: 'Delete',
            icon: 'delete',
            classes: 'md-warn',
            action: function (ev) {
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
            }
          });
        }
      };

      $scope.$watch('document', (newVal) => {
        if (newVal) {
          npdcAppConfig.cardTitle = newVal._rev ? newVal.title || newVal.id.slice(0,8) :
            'New document, not yet saved';
          initBottomSheet();
        }
      }, true);
    }
  };
};

module.exports = formula;
