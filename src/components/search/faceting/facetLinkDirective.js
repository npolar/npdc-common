'use strict';

// The <npdc:facet-link> directive provides clickable field facets, ie. html anchor (<a>) elements with @href set to filter-{field}={value})
// The directive respects the URI (ie. keeps existing query parameters)
// Example usage
// <npdc:facet-link value="{{ ctrl.getUser().email }}" field="created_by" params="{ sort: '-created'}" text="is&#160;creator" count="{{ctrl.count('created_by', ctrl.getUser().email) }}"></npdc:facet-link>
// @todo support not-
// @todo rename not- => reject?
function facetLink($location) {
  'ngInject';

  return {

    restrict: 'E',

    scope: {
      field: '@',
      value: '@',
      count: '@?',
      params: '=?',
      text: '@'
    },

    // todo not link if locaton.seac filter.-field =value!
    template: `<span ng-if="!ctrl.isFilter(field,value)"><a ng-href="{{ ctrl.filter_href(field,value,params) }}">{{ text }}</a><span ng-if="count"> ({{count}})</span></span>
      <span ng-if="ctrl.isFilter(field,value)"><!-- @todo configurable hiding of selected? {{ text }} --></span>`,

    controller: function facetLinkController($scope, $location) {
      'ngInject';

      this.filter_href = (field, value, params) => {
        let existing = Object.assign({},$location.search()); // If you don't create a new copy, the location.search is updated => the app's location is changed *before* anybody clicks the link
        let href = '';

        existing[`filter-${field}`] = value; // @todo encode uri

        if (params) {
          Object.keys(params).forEach(k => {
            existing[k]=params[k];
          });
        }

        Object.keys(existing).forEach(k => {
          href += `&${k}=${existing[k]}`;
        });
        href = href.replace('&', '?');
        return href;
      };

      this.isFilter = (field, value) => {
        return $location.search()[`filter-${field}`] === value;
      };

    },
    controllerAs: 'ctrl'

  };
}
module.exports = facetLink;