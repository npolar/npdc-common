'use strict';

var WarningsController = function ($scope, $routeParams, $document, $location, NpolarMessage, NpdcWarningsService) {
  'ngInject';

  let id = () => $routeParams.id;
  let rev = () => $location.search().rev;
  let isArchived = () => ($location.search().rev && (/^[0-9]+[-]/).test($location.search().rev));
  let revision = () => rev().split('-')[0];

  // FIXME move to ?
  const uiBase = function() {
    let base = $document[0].getElementsByTagName('base')[0].href || '';
    base = base.replace(/\/$/, '');

    let path = '';
    if ($routeParams.id) {
      path = $location.path().split($routeParams.id)[0];
    } else {
      path = $location.path();
    }
    path = path.replace(/\/$/, '');

    let uiBase = base+path;

    return uiBase;
  };

  $scope.headline = "Warning";
  $scope.icon = "warning";
  $scope.subhead = "Observe the following issues";

  $scope.notices_headline = "Notice";
  $scope.notices_subhead = "Please observe";

  $scope.httpError = false;

  NpolarMessage.on('npolar-api-error', (message) => {

    console.log("httpError");

    $scope.httpError = true;
    // message = {status: 404, method: "GET", uri: "//api.npolar.no/…", headers: {}, time: "2016-11-25T10:48:12.510Z"…}
    $scope.headline = 'Error';
    $scope.icon = 'error';
    // @todo sticky
    $scope.subhead = `${window.location}`;

    if (404 === message.status) {
      if (!rev()) {
        NpdcWarningsService.warnings[id] = ["Document does not exist"];
      } else {
        NpdcWarningsService.warnings[id] = ["Document or revision does not exist"];
      }
    }

  });

  $scope.warnings = (id=$routeParams.id) => {
    if (!id) {
      return;
    }
    let warnings = NpdcWarningsService.warnings[id];
    if (isArchived()) {
      return [`You are displaying archived revision ${revision()} of this page <a href="${uiBase()}/${id}">click here</a> to go back to the current version`].concat(warnings);
     }
    return warnings;
  };

  $scope.notices = (id=$routeParams.id) => {
    return NpdcWarningsService.notices[id];
  };

};

module.exports = WarningsController;
