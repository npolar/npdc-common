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
        placeholder: "Search Norwegian Polar Data Centre"
      })
    },
    formula: {},
    i18n: {
      languages: ['en', 'nb', 'nn', 'no']
    }
  };
};

module.exports = npdcAppConfigFactory;
