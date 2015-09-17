'use strict';

/**
 * Angular breadcrumbs service
 * @ngInject
 */
var NpdcBreadcrumbs = function($location, $rootScope) {

  this.breadcrumbs = [];
  
  this.path = "";
  
  var self = this;
  
  var home = { href: "/", title: "Home [Norwegian Polar Data Centre]", text: "Home" };
    
  var capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  var link = (crumb, i) => {
    if (i === 0) {
      self.path = "";
      return home;
    }

    if (i > 0) {
      self.path += `/${crumb}`;
    }

    if (i >= 2 && (/^\w{8}-\w{4}-/).test(crumb)) {
      return { href: self.path, text: crumb.split("-")[0] };
    }
    
    if ((/^\?/).test(crumb)) {
      crumb = `Search: "${ $location.search().q }"`;
    }
    return { href: self.path, title: capitalize(crumb), text: capitalize(decodeURIComponent(crumb)) };
  };
        
  $rootScope.$on("$locationChangeSuccess", function(event, uri) {

    let parts = uri.split("//")[1].split("/").filter(p => { return !(/^$/).test(p); });
    
    // Handle "new" 
    if (JSON.stringify(parts.slice(-2)) === JSON.stringify(['__new', 'edit'])) {
      parts = parts.slice(0, -2).concat('new');
    }
    
    let i = 0;
    self.breadcrumbs = parts.map(
      crumb => {
        return link(crumb, i++);
      }
    );    
  });
  
  return this;
};

module.exports = NpdcBreadcrumbs;