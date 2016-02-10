'use strict';

let npdcAppConfigFactory = function (NpdcAutocompleteConfigFactory, NpdcSearchConfigFactory) {
  'ngInject';

  return {
    toolbarTitle: "",
    toolbarMenuGroups: [{
      name: "Data",
      apps: [{
        link: "/dataset",
        name: "Datasets",
        img: "/assets/img/menu/dataset.png"
      }, {
        link: "//api.npolar.no",
        name: "APIs",
        img: "/assets/img/menu/api.png"
      }, {
        link: "/geodata",
        name: "Geodata",
        img: "/assets/img/menu/geodata.png"
      }, ]
    }, {
      name: "Applications",
      apps: [
        {
          link: "/publication",
          name: "Publications",
          img: "/assets/img/menu/publications.png"
        },
      //   {
      //   link: "/expedition",
      //   name: "Expeditions",
      //   img: "/assets/img/menu/expeditions.png"
      // },
      {
        link: "/vessel",
        name: "Historic Vessels",
        img: "/assets/img/menu/vessels.png"
      }, {
        link: "/map/archive",
        name: "Map archive",
        img: "/assets/img/menu/map_archive.png"
      }, {
        link: "/people",
        name: "People",
        img: "/assets/img/menu/people.png"
      }, {
        link: "http://placenames.npolar.no",
        name: "Placenames",
        img: "/assets/img/menu/placenames.png"
      },
      {
        link: "/indicator/timeseries",
        name: "Timeseries",
        img: "/assets/img/menu/timeseries.png"
      }
      // {
      //   link: "/project",
      //   name: "Projects",
      //   img: "/assets/img/menu/projects.png"
      // },
      ]
    }],
    toolbarInternalApps: [{
      name: "Internal",
      apps: [
      {
        link: "/courses",
        name: "Courses",
        img: "/assets/img/menu/courses.png"
      },
      {
        link: "/marine/biology",
        name: "Marine Biology",
        img: "/assets/img/menu/marine_biology.png"
      }, {
        link: "/user",
        name: "Users",
        img: "/assets/img/menu/users.png"
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
    },
    formula: {},
    i18n: {
      languages: ['en', 'nb', 'nn', 'no']
    }
  };
};

module.exports = npdcAppConfigFactory;
