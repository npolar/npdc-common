'use strict';

let npdcAppConfigFactory = function (NpdcAutocompleteConfigFactory, NpdcSearchConfigFactory, NpdcApplications) {
  'ngInject';

  return {
    toolbarTitle: "",
    toolbarMenuGroups: [{
      name: "Applications",
      apps: NpdcApplications.filter(app => app.category === "public")
    }],
    toolbarInternalApps: [{
      name: "Internal",
      apps: NpdcApplications.filter(app => app.category === "internal")
    }],
    cardTitle: "Norwegian Polar Data Centre",
    search: {
      local: new NpdcSearchConfigFactory(),
      global: new NpdcAutocompleteConfigFactory({
        showCollections: true,
        global: true,
        placeholder: "Search Norwegian Polar Data Centre",
        collections: [
          {
            name: 'dataset',
            path: '/dataset',
            enabled: true
          },
          {
            name: 'publication',
            path: '/publication',
            enabled: true
          },
          {
            name: 'timeseries',
            path: '/indicator/timeseries',
            enabled: true
          },
          {
            name: 'map-archive',
            path: '/map/archive',
            enabled: true
          },
          {
            name: 'person',
            path: '/person',
            enabled: true
          },
          {
            name: 'service',
            path: '/service',
            enabled: true
          },
          {
            name: 'vessel',
            path: '/vessel',
            enabled: true
          },
          {
            name: 'dataset',
            path: '/dataset',
            enabled: true
          }
        ]
      })
    },
    formula: {},
    i18n: {
      languages: ['en', 'nb', 'nn', 'no']
    }
  };
};

module.exports = npdcAppConfigFactory;
