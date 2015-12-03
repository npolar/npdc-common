'use strict';

let FileFunnel = require('filefunnel.js');
let angular = require('angular');

let ff = angular.module('filefunnel', ['ngMaterial']);

ff.controller('FFUploadController', function ($scope, $mdDialog, options) {
	let ff = new FileFunnel(null, options);
	$scope.ff = ff;

	ff._elements.fileInput.on('change', () => {
		$scope.$apply();
	});

	ff.on('success', file => {
		if (ff.status === FileFunnel.status.COMPLETED) {
			$mdDialog.hide(ff.files);
		}
	}).on('error', file => {
		// noop
	}).on('progress', file => {
		// noop
	});

	$scope.isDisabled = function () {
		return ff.files.length === 0;
	};

});

ff.service('FileFunnelService', function ($mdDialog) {
	let options = {
		server: "http://apptest.data.npolar.no/_file",
		accept: "*/*",
		chunked: true
	};

	let showUpload = function (ev, opts) {
		options = Object.assign({}, options, opts);
		return $mdDialog.show({
			clickOutsideToClose:true,
			controller: 'FFUploadController',
			locals: {options},
			targetEvent: ev,
			template: require('./filefunnel.html')
		});
	};

	return {
		options,
		showUpload,
		status: FileFunnel.status
	};
});

ff.directive('filefunnel', function (FileFunnelService) {
	return {
		scope: {
			options: '=filefunnel'
		},
		//@ngInject
		controller($scope, $mdDialog) {
			$scope.showUpload = function (ev) {
				FileFunnelService.showUpload(ev, $scope.options)
					.then(files => {
						ev.target.value = FileFunnelService.options.server + files[0].location;
					});
			};
		},
		link(scope, element, attrs) {
			element.bind('click', scope.showUpload);
		}
	};
});
