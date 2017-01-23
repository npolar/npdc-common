'use strict';

function contributions() {
  'ngInject';

  // Get edits from Editlog API ?
  //if (NpolarApiSecurity.isAuthenticated()) {
  //  $scope.user = NpolarApiSecurity.getUser();
  //  Editlog.facets({q:'', 'filter-request.username': $scope.user.email}, r => {
  //    $scope.contributions = r.find(f => f.facet === 'endpoint').terms.map(t => {
  //      return { text: t.term, href: `${t.term}?q=${$scope.user.name.split(' ').join('+')}`, count: t.count }; });
  //  });
  //}
  return {

    restrict: 'E',

    scope: {
      facets: '='
    },
    template: require('./contributions.html'),
    controller: function ContributionsController($scope, $location, NpolarApiSecurity) {
      'ngInject';

      let ctrl = this;

      this._user = null;

      this.getUser = () => {
        if ($location.search()['filter-created_by']) {
          let email = $location.search()['filter-created_by'];
          return { email, count: 0 };
        }
        return ctrl._user || NpolarApiSecurity.getUser();
      };

      this.isAuthenticated = () => NpolarApiSecurity.isAuthenticated();

      this.count = (field,term) => {
        let facet = ctrl.getFacet(field);

        if (!term && facet) {
          return facet.length;
        } else if (term && facet) {
          let found = facet.find(f => f.term === term);
          if (found && found.count) {
            return found.count;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      };

      this.getFacet = (key, facets=$scope.facets) => {
        if (!facets) {
          return;
        }
        let contribs = facets.filter(f => {
          return (Object.keys(f).includes(key) && f[key]);
        }).map(c => {
          return c[key];
        })[0];
        return contribs;
      };

      this.setUser = (email, count, name=email) => {
        ctrl._user = { name, email, count };
      };

    },
    controllerAs: 'ctrl'

  };
}
module.exports = contributions;