(function() {
	"use strict";
	
	var Chronopic = require('chronopic'), _;
	require('chronopic/dist/js/chronopic-i18n.min.js');
	
	function parseOptions(options, defaults) {
		(typeof options == "object" || (options = {}));
		
		for(var d in defaults) {
			(options.hasOwnProperty(d) || (options[d] = defaults[d]));
		}
		
		return options;
	}
	
	_ = function(options) {
		// String formats used to invoke Chronopic constructor
		var formats = [ 'date', 'date-time' ];
		
		options = parseOptions(options, {
			date: null,
			format: "{date}"
		});
		
		return function() {
			return {
				restrict: 'E',
				require: '?ngModel',
				link: function(scope, elem, attrs, model) {
					if(model && scope.field && formats.indexOf(scope.field.format) > -1) {
						// Try parsing any pre-existing value as a date
						var parsedDate = (options.date instanceof Date ? options.date : new Date(Date.parse(scope.field.value)));
						
						// CSS Overrides
						if(typeof options.css == "object") {
							for(var key in options.css) {
								elem.css(key, options.css[key]);
							}
						}
						
						// Inject Chronopic instance on element
						new Chronopic(elem[0], {
							date: isNaN(parsedDate) ? null : parsedDate,
							format: (typeof options.format == "string" ? options.format : null),
							className: 'chronopic.chronopic-ext-md',
							onChange: function(elem, date) {
								model.$viewValue = date.toISOString();
								scope.field.value = date.toISOString();
								
								if(typeof options.onChange == "function") {
									options.onChange(elem, date, scope);
								}
							}
						});
					}
				}
			};
		};
	};
	
	if(typeof module == "object") {
		module.exports = _;
	}
	
	return _;
})();
