'use strict';

function AuthorsController($scope, $location, $anchorScroll) {
  'ngInject';

  let self = this;

  let name = (p) => `${p.first_name||''} ${p.last_name}`.trim();

  this.icon = () => {
    if ($scope.icon) {
      return $scope.icon;
    }
    return 'people';
  };

  this._show = { author: true, contributor: false, affiliations: false };

  this.flip = (role='contributor') => {
    self._show[role] = !self._show[role];
  };

  this.show = (role) => self._show[role];

  // Inject contributors (other than authors) from outside scope
  this.contributors = ($scope.people||[]).filter(
    p => (false === p.roles.includes('author'))
  ).map(c => {
    if (c && !c.name && c.last_name) {
      c.name = name(c);
    }
    return c;
  });

  // Inject authors from outside scope
  this.authors = ($scope.authors||[]).map(a => {
    if (a && !a.name && a.last_name) {
      a.name = name(a);
    }
    return a;
  });

  $scope.document = { people: self.authors.concat(self.contributors||[]) };

  this.isNpolar = (o) => {
    return ((/npolar\.no|NPI|Norsk Polarinstitutt|Norwegian Polar Institute/i).test(o));
  };

  this.tinyLogo = (id) => {
    return "http://www.npolar.no/system/modules/no.npolar.site.npweb/resources/style/np-logo.svg?fingerprint=1386594068655";
  };

  $scope.hasRole = (person, role) => {
    if (!person || !person.roles.length || !role) { return; }
    return person.roles.includes(role);
  };

  $scope.gotoPerson = (person) => {
    if (!person) { return; }
    let anchor = `${person.first_name}+${person.last_name}`.toLowerCase();
    console.log('gotoPerson', person, anchor);
    $location.hash(anchor);
    $anchorScroll();
  };

  $scope.isContact = (person) => {
    if (!person || !person.roles.length || person.roles.length < 1) { return; }
    if (person.roles.findIndex(r => ['correspondent', 'pointOfContact'].includes(r)) >= 0) {
      return true;
    }
  };


}
module.exports = AuthorsController;