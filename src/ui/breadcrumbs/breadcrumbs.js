'use strict';

var breadcrumbs = function () {
  return {
    controller: 'NpdcBreadcrumbsController',
    template: require('./breadcrumbs.html')
  };
};

module.exports = breadcrumbs;
