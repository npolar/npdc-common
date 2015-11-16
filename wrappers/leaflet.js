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
			var map = L.map('leaflet-map');
			var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
			var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
			var osm = L.tileLayer(osmUrl, {attribution: osmAttrib});
			var center = [69, 19], covs;
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
					L.polygon(poly).addTo(map);
				});

				center = [y_min+(y_max-y_min)/2, x_min+(x_max-x_min)/2];
			}

			map.setView(center, 4);
			map.addLayer(osm);
		}
	};
};

module.exports = mapDirective;
