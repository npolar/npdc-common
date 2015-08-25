'use strict';

/**
 * @ngInject
 */
var NpdcBreadcrumbs = function($location, $rootScope) {

  this.breadcrumbs = [];
  
  this.path = "";
  
  var self = this;
  
  var home = { href: "/", title: "Norwegian Polar Data Centre", text: "NPDC" };
    
  var capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  var link = (crumb, i, prev) => {
    if (i === 0) {
      self.path = "";
      return home;
    }

    if (i > 0) {
      self.path += `/${crumb}`;
    }

    if (i === 2 && (/^\w{8}-\w{4}-/).test(crumb)) {
      return { href: self.path, text: crumb.split("-")[0] };
    }
    return { href: self.path, title: capitalize(crumb), text: capitalize(crumb) };
  };
        
  $rootScope.$on("$locationChangeSuccess", function(event, uri) {
    let parts = uri.split("//")[1].split("/").filter(p => { return !(/^$/).test(p); });
    let i = 0;
    let crumbs = parts.map(
      crumb => {
        return link(crumb, i++);
      }
    );
    self.breadcrumbs = crumbs;
  });
  
  return this;
};

module.exports = NpdcBreadcrumbs;