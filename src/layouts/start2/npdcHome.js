"use strict";

require("../../");
var angular = require("angular");

angular.module("npdcHome", ["npdcUi"])
.controller("npdcHomeController", function(npdcAppConfig, $scope, $anchorScroll) {
	$scope.options = npdcAppConfig;
});

(function(body) {
	document.addEventListener("DOMContentLoaded", function() {
		if((body = document.querySelector(body))) {
			var ease = function(pos, initial, target, len) { return (target - initial) * Math.pow(2.0, 10.0 * (pos / len - 1.0)) + initial; };
			var header = body.querySelector("header");
			var toolbar = body.querySelector("md-toolbar");
			var quicknav = header.querySelector(".quicknav");
			var pagenav = body.querySelector(".pagenav");
			var boxShadow = window.getComputedStyle(toolbar).boxShadow;
			var scrollUp = document.getElementById("scroll-up");

			var pageSets = [
				{
					section: document.getElementById("news"),
					link: pagenav.querySelectorAll("a")[0]
				},
				{
					section: document.getElementById("expeditions"),
					link: pagenav.querySelectorAll("a")[1]
				},
				{
					section: document.getElementById("documents"),
					link: pagenav.querySelectorAll("a")[2]
				}
			];

			toolbar.style.boxShadow = "none";
			header.style.boxShadow = boxShadow;

			var updateCallback = function() {
				var scrollY = window.pageYOffset, scale = 1.0;

				if(body.offsetWidth > 700) {
					if(scrollY) {
						scale = Math.max(0.0, ease(scrollY, 1.0, 0.0, header.offsetHeight - toolbar.offsetHeight));
					}

					quicknav.style.transform = "translateY(calc(-50% + " + (scrollY / 2) + "px)) scale(" + scale + ")";

				} else {
					quicknav.style.transform = "none";
				}

				if(scrollY >= header.offsetHeight - toolbar.offsetHeight) {
					header.style.boxShadow = "none";
					toolbar.style.boxShadow = boxShadow;
					pagenav.classList.add("docked");
					scrollUp.style.transform = "scale(1.0)";
				} else {
					header.style.boxShadow = boxShadow;
					toolbar.style.boxShadow = "none";
					pagenav.classList.remove("docked");
					scrollUp.style.transform = "scale(0.0)";
				}

				pageSets.forEach(function(set, index, arr) {
					set.link.style.transform = ((scrollY >= set.section.offsetTop - toolbar.offsetHeight) ? "scale(0.0)" : "");
				});
			};

			window.addEventListener("scroll", updateCallback);
			window.addEventListener("resize", updateCallback);
		}
	});
})(".npdc-home");
