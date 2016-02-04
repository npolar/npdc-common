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
		template: '<div class="leaflet-map"></div>',
		link: function (scope, iElement) {
			scope.options = Object.assign({}, scope.options);
			let mapOptions = Object.assign({
				maxZoom: 10,
				minZoom: 2,
				maxBounds: [[-90,180],[90,-180]]
			});
			let osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
			let osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
			let osm = L.tileLayer(osmUrl, {attribution: osmAttrib});
			let coverage = scope.options.coverage;
			let map = L.map(iElement.find('div')[0], mapOptions).setView([69.68, 18.94], 3);
			let drawnItems;

			let addLayer = function (layer) {
				if (drawnItems) {
					if (drawnItems.getLayers().length > 0) {
						drawnItems.clearLayers();
					}
					layer.on('click', clickEvent => {
						console.log(clickEvent.target.editing);
						clickEvent.target.editing._fireEdit();
					});
					layer.addTo(drawnItems);
				} else {
					layer.addTo(map);
				}
			};

			if (scope.options.draw) {
				// Initialise the FeatureGroup to store editable layers
				drawnItems = new L.FeatureGroup();

				let editOptions = false;
				if (scope.options.edit) {
					editOptions = Object.assign({
						featureGroup: drawnItems
					}, {
						edit: scope.options.edit
					}, {
						remove: scope.options.remove
					});
				}

				// Initialise the draw control and pass it the FeatureGroup of editable layers
				let drawControl = new L.Control.Draw({
						edit: editOptions,
						draw: Object.assign({
							polyline: false,
							polygon: false,
							rectangle: false,
							circle: false,
							marker: false
						}, scope.options.draw)
				});
				map.addControl(drawControl);
				map.addLayer(drawnItems);

				map.on('draw:created', e => {
					addLayer(e.layer);
					scope.$emit('mapSelect', e.layer);
				});

				map.on('draw:edited', e => {
					e.layers.eachLayer(layer => {
						scope.$emit('mapSelect', layer);
					});
				});
			}

			if (coverage) {
				// cov = [[south, west], [north, east]]
				let x_max, x_min, y_min, y_max;
				x_max = x_min = coverage[0][1][1]; // east
				y_max = y_min = coverage[0][1][0]; // north

				coverage.forEach(cov => {
					let south = cov[0][0];
					let west = cov[0][1];
					let north = cov[1][0];
					let east = cov[1][1];
					x_max = Math.max(x_max, east);
					y_max = Math.max(y_max, north);
					x_min = Math.min(x_min, south);
					y_min = Math.min(y_min, west);
					let poly = [[south, west], [north, east]];
					let layer = L.rectangle(poly);
					addLayer(layer);
				});
				map.fitBounds([[y_min, x_min],[y_max, x_max]], {padding: [20, 20]});
			}

			map.addLayer(osm);
		}
	};
});
