'use strict';

// @ngInclude

require('../../');
let angular = require('angular');

angular.module('appWrapper', ['npdcUi']).controller('AppWrapperCtrl', function($scope) {
  $scope.myWrappedApp = {
    toolbar_logo_link: "",
    toolbar_logo: "http://www.npolar.no/npcms/export/sites/np/images/logos/norsk-polarinstitutt-logo-norsk-hvit.png",
    toolbar_title: "Metal Archive",
    toolbar_menu_groups: [
      {
        name: "Data",
        apps: [
          {link: "#", name:"Datasets"},
          {link: "#", name:"Map Archive"},
          {link: "#", name:"Oceanography"}
        ]
      },
      {
        name: "Services",
        apps: [
          {link: "#", name:"Placenames"}
        ]
      }
    ],
    card_title: "UNDEAD CORPORATION"
  };
});
