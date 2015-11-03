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
			var pagenav = header.querySelector(".pagenav");
			var boxShadow = window.getComputedStyle(toolbar).boxShadow;

			var pageNavSet = [
				{
					section: document.querySelector("#news"),
					link: pagenav.querySelectorAll("a")[0]
				},
				{
					section: document.querySelector("#expeditions"),
					link: pagenav.querySelectorAll("a")[1]
				},
				{
					section: document.querySelector("#policy"),
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
					toolbar.style.boxShadow = boxShadow;
					header.style.boxShadow = "none";
					pagenav.style.position = "fixed";
					pagenav.style.top = "16px";
				} else {
					toolbar.style.boxShadow = "none";
					header.style.boxShadow = boxShadow;
					pagenav.style.position = "";
					pagenav.style.top = "";
				}

				for(var p in pageNavSet) {
					pageNavSet[p].link.style.transform = (scrollY >= pageNavSet[p].section.offsetTop - toolbar.offsetHeight) ? "scale(0.0)" : "";
				}
			};

			window.addEventListener("scroll", updateCallback);
			window.addEventListener("resize", updateCallback);
		}

		/*
		var globe = new glacier.GlobeScene("expeditionCanvas", {
			background:		new glacier.Color(19, 47, 80),
			texture: 		"gfx/earth.jpg",
			mouseControl:	false,
			nightTexture:	"gfx/earth_night.jpg",
			normalMap:		"gfx/normal_bathymetry.jpg"
		});

		globe.addData("http://api.npolar.no/expedition/track/?q=&filter-code=Utsettingstokt-2014&format=geojson&limit=all", glacier.color.RED);
		globe.addData("http://api.npolar.no/expedition/track/?q=&filter-code=Framstrait-2014&format=geojson&limit=all", glacier.color.YELLOW);
		globe.addData("http://api.npolar.no/expedition/track/?q=&filter-code=MOSJ-ICE-2014&format=geojson&limit=all", glacier.color.GREEN);
		globe.addData("http://api.npolar.no/expedition/track/?q=&filter-code=PolarBear2-2014&format=geojson&limit=all", glacier.color.BLUE);
		globe.context.resize(globe.container.offsetWidth, globe.container.offsetHeight);
		globe.focus(new glacier.Vector2(10, 70));
		globe.run();
		*/
	});
})(".npdc-home");
