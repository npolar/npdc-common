"use strict";

let BottomSheetController = function($scope, $mdBottomSheet) {
  "ngInject";

  $scope.showBottomSheet = function($event) {
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-template.tmpl',
      scope: $scope,
      preserveScope: true,
      controller: function ($scope, $timeout) {
        'ngInject';

        let init = function () {
          let wrapper = document.querySelector('.np-content');
          if (wrapper) {
            let viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let viewOffsetBottom = wrapper.getBoundingClientRect().bottom;
            if (viewOffsetBottom > viewHeight) {
              let bottomSheet = document.getElementsByTagName('md-bottom-sheet')[0];
              bottomSheet.style.bottom = (viewOffsetBottom - viewHeight) + 'px';
            }
          }
        };
        $timeout(init);
      },
      targetEvent: $event,
      parent: document.querySelector('.np-content'),
    });
  };

  $scope.listItemClick = function($index) {
    var item = $scope.options.items[$index];
    item.action.apply({});
    $mdBottomSheet.hide(item);
  };

};

module.exports = BottomSheetController;
