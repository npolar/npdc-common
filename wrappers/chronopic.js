(function() {
  "use strict";
  
  var Chronopic = require('chronopic'), _;
  require('chronopic/dist/js/chronopic-i18n.min.js');
  
  _ = function() {
    // String formats used to invoke Chronopic constructor
    var formats = [ 'date', 'date-time' ];
    
    return {
      restrict: 'E',
      require: '?ngModel',
      link: function(scope, elem, attrs, model) {
        if(scope.field && formats.indexOf(scope.field.format) > -1) {
          // Try parsing any pre-existing value as a date
          var parsedDate = new Date(scope.field.value);
          
          // CSS Overrides
          elem.css('max-width', '340px');
          
          // Inject Chronopic instance on element
          new Chronopic(elem[0], {
            date: isNaN(parsedDate) ? null : parsedDate,
            className: 'chronopic.chronopic-ext-md',
            onChange: function(elem, date) {
              model.$setViewValue(date.toISOString());
            }
          });
        }
      }
    };
  };
  
  if(typeof module == "object") {
	module.exports = _;
  }
  
  return _;
})();
