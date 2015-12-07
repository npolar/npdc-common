'use strict';

// @ngInject
let npdcAppConfigFactory = function (NpdcAutocompleteConfigFactory, NpdcSearchConfigFactory) {
  return {
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
        link: "/geodata",
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
        link: "http://placenames.npolar.no",
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
      apps: [
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
        link: "/courses",
        name: "Courses"
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
      local: new NpdcSearchConfigFactory(),
      global: new NpdcAutocompleteConfigFactory({
        showCollections: true,
        global: true,
        placeholder: "Search Norwegian Polar Data Centre"
      })
    }
  };
};

module.exports = npdcAppConfigFactory;
