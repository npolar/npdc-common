'use strict';

/**
 * Angular breadcrumbs service
 * @ngInject
 */
var NpdcBreadcrumbs = function($location, $rootScope, $window) {

  var self = this;

  this.breadcrumbs = [];

  this.path = "";

  var home = { href: "/home", title: "Home [Norwegian Polar Data Centre]", text: "home" };

  let translate = (string) => {
    return string; // .charAt(0).toUpperCase() + string.slice(1);
  };

  var link = (crumb, i) => {
    if (i === 0) {
      return home;
    }

    if (i > 0) {
      self.path += '/' + crumb;
    }

    if (i >= 2 && (/^\w{8}-\w{4}-/).test(crumb)) {
      return { href: self.path, text: crumb.split("-")[0] };
    }

    //if ((/^[?|&]q=/).test(crumb)) {
    //  crumb = `"${ $location.search().q }"`;
    //}
    return { href: self.path, title: translate(crumb), text: decodeURIComponent(translate(crumb)) };
  };

  var buildCrumbs = function(event, uri) {
    // Get URI parts (split by /)
    let parts = uri.split("//")[1].split('?')[0].split("/").slice(1).filter(p => !!p);

    // Handle home
    if (parts[0] === 'home') {
      self.path += '/home';
    } else {
      parts.unshift('home');
    }

    // Add query
    if ($location.search().q) {
      parts = parts.concat(`"${$location.search().q}"`);
    }

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
    // Set html/head/title
    $window.document.title = $location.host() +' > ' + self.breadcrumbs.slice(1).map(b => b.text.toLowerCase()).join(' > ');
    self.path = "";
  };

  $rootScope.$on('$locationChangeSuccess', buildCrumbs);

  return this;
};

module.exports = NpdcBreadcrumbs;
