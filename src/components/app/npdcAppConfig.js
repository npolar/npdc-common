'use strict';

module.exports = {
  toolbarLogoLink: ".",
  toolbarLogo: "http://www.npolar.no/npcms/export/sites/np/images/logos/norsk-polarinstitutt-logo-norsk-hvit.png",
  toolbarTitle: "",
  toolbarMenuGroups: [
    {
      name: "Data",
      apps: [
        {link: "/dataset", name:"Datasets"},
        {link: "//api.npolar.no", name:"APIs"},
        {link: "//geodata.npolar.no", name:"Geographic services"},
      ]
    },
    {
      name: "Applications",
      apps: [
        {link: "/expedition", name: "Expeditions"},
        {link: "/vessel", name: "Historic Vessels"},
        {link: "/indicator", name: "Indicators (environmental monitoring)"},
        {link: "/map/archive", name: "Map archive"},
        {link: "/people", name: "People"},
        {link: "/placename", name: "Placenames"},
        {link: "/project", name: "Projects"},
        {link: "/publication", name: "Publications"}
      ]
    }
  ],
  toolbarInternalApps: [
    {
      name: "Internal applications",
      apps: [
        {link: "/courses", name: "Courses"},
        {link: "/marine/biology", name: "Marine Biology"},
        {link: "/user", name: "Users"}
      ]
    }
  ],
  cardTitle: "Norwegian Polar Data Centre",
  search: {
    filterOptions: {},
    facets: []
  }
};
