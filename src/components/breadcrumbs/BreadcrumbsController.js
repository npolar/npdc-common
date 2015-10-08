'use strict';

// @ngInject
var BreadcrumbsController = function ($scope, NpdcBreadcrumbs) {
  $scope.breadcrumbs = NpdcBreadcrumbs;
};

module.exports = BreadcrumbsController;
