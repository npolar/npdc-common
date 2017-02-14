'use strict';

var formula = function($mdDialog, $location, $routeParams, $filter,
  npdcAppConfig, NpolarTranslate) {
  'ngInject';

  return {
    template: require('./edit.html'),
    scope: false,
    controller: function($scope) {
      'ngInject';

      if (npdcAppConfig.help) {
        $scope.help = npdcAppConfig.help;
      }

      let initBottomSheet = function() {
        $scope.bottomSheetOptions = {
          items: [],
          alwaysShow: false
        };


        if ($scope.security.isAuthorized('delete', $scope.resource.path) && $scope.document._rev) {
          let name = 'Delete';
          $scope.bottomSheetOptions.items.push({
            name: NpolarTranslate.translate(name),
            icon: 'delete',
            classes: 'md-warn',
            action: function(ev) {
              // Appending dialog to document.body to cover sidenav in docs app
              var confirm = $mdDialog.confirm()
                .title(NpolarTranslate.translate('Confirm delete'))
                .textContent(NpolarTranslate.translate('delete.confirm'))
                .targetEvent(ev)
                .ok(NpolarTranslate.translate(name))
                .cancel(NpolarTranslate.translate('Cancel'));
              $mdDialog.show(confirm).then(function() {
                $scope.delete();
              }, function() {
                // noop
              });
            }
          });
        }


        if ($scope.security.isAuthorized('create', $scope.resource.path) && $scope.document._rev) {
          let duplicate = 'Duplicate';
          $scope.bottomSheetOptions.items.push({
            name: NpolarTranslate.translate(duplicate),
            icon: 'control_point_duplicate',
            classes: 'md-primary',
            action: function(ev) {
              var confirm = $mdDialog.confirm()
                .title(NpolarTranslate.translate('Confirm duplication'))
                .textContent(NpolarTranslate.translate('Confirm that you want to create a copy of the current document'))
                .targetEvent(ev)
                .ok(NpolarTranslate.translate(duplicate))
                .cancel(NpolarTranslate.translate('Cancel'));
              $mdDialog.show(confirm).then(function() {
                $scope.duplicate($scope.document, true);
              }, function() {
                // noop
              });
            }
          });
        }
      };

      $scope.$on('npolar-lang', (e, lang) => {
        $scope.formula.i18n.set(lang.lang);
        if ($scope.document && $scope.document._rev && $scope.document.title) {
          $scope.title = $filter('i18n')($scope.document.title);
        }
      });

      // @FIXME Sometimes goes bananas and spams dialogs...
      // $scope.formula.setConfirmDirtyNavigate((navigate) => {
      //   let confirmNavigate = $mdDialog.confirm()
      //     .title(NpolarTranslate.translate('navigation.confirm.title'))
      //     .textContent(NpolarTranslate.translate('navigation.confirm.text'))
      //     .ok(NpolarTranslate.translate('Yes'))
      //     .cancel(NpolarTranslate.translate('No'));
      //   $mdDialog.show(confirmNavigate).then(function() {
      //     navigate();
      //   });
      // });

      $scope.title = $routeParams.id;
      $scope.id = $routeParams.id;

      $scope.href = function (id) {
        return $scope.resource ? $scope.resource.href(id) : id;
      };

      $scope.$watch('document', (d, was) => {
        if (d) {
          if (d._rev) {
            if (d.title) {
              $scope.title = $filter('i18n')(d.title);
            }
          } else {
            $scope.title = NpolarTranslate.translate('document.new');
          }
          initBottomSheet();
        }
      });

    }
  };
};

module.exports = formula;
