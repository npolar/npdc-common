'use strict';

let L = require('leaflet');

//@ngInject
let mapDirective = function () {
	return {
		scope: {
			options: '='
		},
		template: '<div id="leaflet-map"></div>',
		//@ngInject
		controller: function ($scope) {
			let map = L.map('leaflet-map', {maxZoom: 10, minZoom: 2, maxBounds: [[-90,180],[90,-180]]});
			let osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
			let osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
			let osm = L.tileLayer(osmUrl, {attribution: osmAttrib});
			let covs;
			$scope.options = Object.assign({}, $scope.options);
			covs = $scope.options.coverage;


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
};

module.exports = mapDirective;
