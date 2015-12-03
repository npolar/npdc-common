'use strict';

let FileFunnel = require('filefunnel.js/src/filefunnel.js');
let angular = require('angular');

let ff = angular.module('filefunnel', ['ngMaterial']);

ff.controller('FFUploadController', function ($scope, $mdDialog, options) {
	let ff = new FileFunnel(null, options);
	$scope.ff = ff;
	$scope.progress = 0;
	$scope.error = false;

	ff._elements.fileInput.on('change', () => {
		$scope.$apply();
	});

	ff.on('success', file => {
		$mdDialog.hide(file.location);
	}).on('error', file => {
		$scope.error = file.elements.info.value;
	}).on('progress', file => {
		$scope.progress =	file.progress;
	});

	$scope.isDisabled = function () {
		return ff.files.length === 0;
	};

});

ff.directive('filefunnel', function () {
	return {
		scope: {
			options: '=filefunnel'
		},
		//@ngInject
		controller($scope, $mdDialog) {
			let options = Object.assign({}, {
				server: "http://aptest.data.npolar.no/_file",
				accept: "*/*",
				chunked: true
			}, $scope.options);

			$scope.showUpload = function (ev) {
				$mdDialog.show({
					clickOutsideToClose:true,
					controller: 'FFUploadController',
					locals: {options},
					targetEvent: ev,
					template: require('./filefunnel.html')
				}).then(fileref => {
					ev.target.value = options.server + fileref;
				});
			};
		},
		link(scope, element, attrs) {
			element.bind('click', scope.showUpload);
		}
	};
});
