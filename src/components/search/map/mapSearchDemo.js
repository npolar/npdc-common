'use strict';

require('../../');
let angular = require('angular');
require('../../../wrappers/leaflet');

let mapSearchDemo = angular.module('mapSearchDemo', ['npdcCommon', 'templates', 'leaflet']);

mapSearchDemo.controller('MapSearchDemoCtrl', ($scope, NpolarApiResource) => {
  $scope.options = {
    points: []
  };

  let Dataset = NpolarApiResource.resource({'path': '/dataset', 'resource': 'Dataset' });

  $scope.$on('map:move', (e, bounds) => {
    Dataset.feed({
      'filter-coverage.north': bounds.getSouth() + '..',
      'filter-coverage.south': '..' + bounds.getNorth(),
      'filter-coverage.west': '..' + bounds.getEast(),
      'filter-coverage.east': bounds.getWest() + '..'
    }, response => {
      let points = [];
      response.feed.entries.forEach(e => {
        if (e.coverage) {
          e.coverage.forEach(cov => {
            points.push({
              popup: `<a href="${Dataset.href(e.id)}">${e.title}</a>`,
              point: [
                cov.south + Math.abs(cov.north - cov.south) / 2,
                cov.west + Math.abs(cov.east - cov.west) / 2]
            });
          });
        }
      });
      $scope.options.points = points;
    });
  });
});
