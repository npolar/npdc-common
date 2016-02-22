'use strict';

var formula = function ($mdDialog, npdcAppConfig) {
  'ngInject';

  return {
    template: require('./edit.html'),
    scope: false,
    controller: function ($scope) {
      'ngInject';

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
                .textContent('Are you sure you want to delete?')
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

      $scope.$on('npolar-lang', (e, lang) => {
        $scope.formula.i18n.set(lang.lang);
      });

      $scope.$watch('document', (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          // @TODO Set titles (i18n)
          npdcAppConfig.cardTitle = newVal._rev ? newVal.title || newVal.id.slice(0,8) :
            'New document, not yet saved';
          initBottomSheet();
        }
      });
    }
  };
};

module.exports = formula;
