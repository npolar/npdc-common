'use strict';

require('../../');
let angular = require('angular');

angular.module('start', ['npdcUi'])
.controller('Start2DemoController', function(npdcAppConfig, $scope) {
	$scope.options = npdcAppConfig;
});

function ease(pos, initial, target, len) {
	return (target - initial) * Math.pow(2.0, 10.0 * (pos / len - 1.0)) + initial;
}

window.addEventListener('scroll', function() {
	var offY = document.body.scrollTop / 2, scale = 1.0;

	if(document.body.scrollTop) {
		var header = document.body.querySelector('header');
		var toolbar = document.body.querySelector('header md-toolbar');

		scale = Math.max(0.0, ease(document.body.scrollTop, 1.0, 0.0, header.offsetHeight - (toolbar.offsetHeight * 2)));
	}

	document.body.querySelector('header .quicknav')
	.style.transform = "translateY(calc(-50% + " + offY + "px)) scale(" + scale + ")";
});
