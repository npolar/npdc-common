"use strict";

module.exports = function() {
  "ngInject";

  return {
    scope: {
      doi: "=?",
      license: "=?",
      openAccess: "=?"
    },
    template: require("./doc-attribs.html"),
    controller($scope) {
      "ngInject";

      Object.defineProperties($scope, {
        licenseImg: {
          get() {
            return "/assets/img/licenses/" + $scope.license + ".png";
          }
        },
        openAccessIcon: {
          get() {
            return ($scope.openAccess ? "lock_open" : "lock_outline");
          }
        },
        openAccessLabel: {
          get() {
            return ($scope.openAccess ? "Open access" : "restricted");
          }
        }
      });
    }
  };
};
