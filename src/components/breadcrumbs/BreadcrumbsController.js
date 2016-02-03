'use strict';

var BreadcrumbsController = function ($scope, NpdcBreadcrumbs) {
  'ngInject';

  $scope.breadcrumbs = NpdcBreadcrumbs;
};

module.exports = BreadcrumbsController;
