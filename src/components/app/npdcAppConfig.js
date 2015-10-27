'use strict';

// @ngInject
let npdcAppConfigFactory = function (NpdcAutocompleteConfigFactory) {
  return {
    toolbarLogoLink: ".",
    toolbarLogo: "http://www.npolar.no/npcms/export/sites/np/images/logos/norsk-polarinstitutt-logo-norsk-hvit.png",
    toolbarTitle: "",
    toolbarMenuGroups: [{
      name: "Data",
      apps: [{
        link: "/dataset",
        name: "Datasets"
      }, {
        link: "//api.npolar.no",
        name: "APIs"
      }, {
        link: "//geodata.npolar.no",
        name: "Geographic services"
      }, ]
    }, {
      name: "Applications",
      apps: [{
        link: "/expedition",
        name: "Expeditions"
      }, {
        link: "/vessel",
        name: "Historic Vessels"
      }, {
        link: "/map/archive",
        name: "Map archive"
      }, {
        link: "/people",
        name: "People"
      }, {
        link: "/placename",
        name: "Placenames"
      }, {
        link: "/project",
        name: "Projects"
      }, {
        link: "/publication",
        name: "Publications"
      }]
    }],
    toolbarInternalApps: [{
      name: "My applications",
      apps: [{
        link: "/courses",
        name: "Courses"
      },
      {
        link: "/indicator",
        name: "Indicators (environmental monitoring)"
      },
      {
        link: "/indicator/parameter",
        name: "Parameters (environmental monitoring)"
      },{
        link: "/indicator/timeseries",
        name: "Timeseries (environmental monitoring)"
      },

      {
        link: "/marine/biology",
        name: "Marine Biology"
      }, {
        link: "/user",
        name: "Users"
      }]
    }],
    cardTitle: "Norwegian Polar Data Centre",
    search: {
      filterUi: {
        'year-released': {
          type: 'range'
        }
      },
      facets: undefined,
      autocomplete: new NpdcAutocompleteConfigFactory({showCollections: true})
    }
  };
};

module.exports = npdcAppConfigFactory;
