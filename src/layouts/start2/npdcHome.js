"use strict";

require("../../");
var angular = require("angular");

angular.module("NPDCHome", ["npdcUi"])
.controller("NPDCHomeController", function(npdcAppConfig, $scope) {
	$scope.options = npdcAppConfig;
});

(function(body) {
	document.addEventListener("DOMContentLoaded", function() {
		if((body = document.querySelector(body))) {
			var ease = function(pos, initial, target, len) { return (target - initial) * Math.pow(2.0, 10.0 * (pos / len - 1.0)) + initial; };
			var header = body.querySelector("header"), toolbar = body.querySelector("md-toolbar"), quicknav = body.querySelector("header .quicknav");
			var boxShadow = window.getComputedStyle(toolbar).boxShadow;

			toolbar.style.boxShadow = "none";
			header.style.boxShadow = boxShadow;

			var updateCallback = function() {
				if(body.offsetWidth > 700) {
					var offY = body.scrollTop / 2, scale = 1.0;

					if(body.scrollTop) {
						scale = Math.max(0.0, ease(body.scrollTop, 1.0, 0.0, header.offsetHeight - (toolbar.offsetHeight * 2)));
					}

					quicknav.style.transform = "translateY(" + offY + "px) scale(" + scale + ")";
				}

				if(body.scrollTop >= header.offsetHeight - toolbar.offsetHeight) {
					toolbar.style.boxShadow = boxShadow;
					header.style.boxShadow = "none";
				} else {
					toolbar.style.boxShadow = "none";
					header.style.boxShadow = boxShadow;
				}
			};

			window.addEventListener("scroll", updateCallback);
			window.addEventListener("resize", updateCallback);
		}
	});
})(".npdc-home");
