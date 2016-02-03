'use strict';

let angular = require('angular');
let L = require('leaflet');
require('leaflet-draw');

angular.module('leaflet', []).directive('leaflet', function () {
	'ngInject';

	return {
		scope: {
			options: '='
		},
		template: '<div id="leaflet-map"></div>',
		controller: function ($scope) {
			'ngInject';

			$scope.options = Object.assign({}, $scope.options);

			let mapOptions = Object.assign({
				maxZoom: 10,
				minZoom: 2,
				maxBounds: [[-90,180],[90,-180]]
			});
			let osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
			let osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
			let osm = L.tileLayer(osmUrl, {attribution: osmAttrib});
			let covs = $scope.options.coverage;
			let map = L.map('leaflet-map', mapOptions).setView([69.68, 18.94], 3);

			if ($scope.options.draw) {
				// Initialise the FeatureGroup to store editable layers
				var drawnItems = new L.FeatureGroup();
				map.addLayer(drawnItems);

				// Initialise the draw control and pass it the FeatureGroup of editable layers
				var drawControl = new L.Control.Draw({
						draw: Object.assign({
							polyline: false,
							polygon: false,
							rectangle: false,
							circle: false,
							marker: false
						}, $scope.options.draw)
				});
				map.addControl(drawControl);

				map.on('draw:created', e => {
					map.addLayer(e.layer);
					$scope.emit('mapSelect', e.layer);
				});
			}

			if (covs) {
				let x_max, x_min, y_min, y_max;
				x_max = x_min = covs[0].west;
				y_max = y_min = covs[0].north;

				covs.forEach(cov => {
					x_max = Math.max(x_max, cov.east);
					y_max = Math.max(y_max, cov.north);
					x_min = Math.min(x_min, cov.west);
					y_min = Math.min(y_min, cov.south);
					let poly = [[cov.north, cov.west], [cov.south, cov.east]];
					L.rectangle(poly).addTo(map);
				});
				map.fitBounds([[y_min, x_min],[y_max, x_max]], {padding: [20, 20]});
			}

			map.addLayer(osm);
		}
	};
});
