'use strict';

var formula = function($mdDialog, $location, $routeParams, npdcAppConfig, npolarDocumentUtil, NpolarTranslate) {
  'ngInject';

  return {
    template: require('./edit.html'),
    scope: false,
    controller: function($scope) {
      'ngInject';

      let initBottomSheet = function() {
        $scope.bottomSheetOptions = {
          items: [],
          alwaysShow: false
        };
        if ($scope.security.isAuthorized('delete', $scope.resource.path) && $scope.document._rev) {
          $scope.bottomSheetOptions.items.push({
            name: NpolarTranslate.translate('Delete'),
            icon: 'delete',
            classes: 'md-warn',
            action: function(ev) {
              // Appending dialog to document.body to cover sidenav in docs app
              var confirm = $mdDialog.confirm()
                .title(NpolarTranslate.translate('Delete'))
                .textContent(NpolarTranslate.translate('delete.confirm'))
                .targetEvent(ev)
                .ok(NpolarTranslate.translate('Delete'))
                .cancel(NpolarTranslate.translate('Cancel'));
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

      $scope.formula.setConfirmDirtyNavigate((navigate) => {
        let confirmNavigate = $mdDialog.confirm()
          .title(NpolarTranslate.translate('navigation.confirm.title'))
          .textContent(NpolarTranslate.translate('navigation.confirm.text'))
          .ok(NpolarTranslate.translate('Yes'))
          .cancel(NpolarTranslate.translate('No'));
        $mdDialog.show(confirmNavigate).then(function() {
          navigate();
        });
      });

      $scope.title = "";
      $scope.id = $routeParams.id;

      $scope.href = function (id) {
        return $scope.resource ? $scope.resource.href(id) : id;
      };

      $scope.$watch('document', (newVal, oldVal) => {
        if (newVal) {
          $scope.title = newVal._rev ? npolarDocumentUtil.title(newVal) :
            NpolarTranslate.translate('document.new');
          initBottomSheet();
        }
      });
    }
  };
};

module.exports = formula;
