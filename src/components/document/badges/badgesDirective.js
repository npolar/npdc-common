"use strict";

module.exports = function() {
  "ngInject";

  return {
    scope: {
      doi: "=?",
      license: "=?",
      openAccess: "=?"
    },
    template: require("./badges.html"),
    controller($scope) {
      "ngInject";

      var licenses = {
        "cc-by-nc-nd":  { img: "licenses/cc/by-nc-nd",  href: "https://creativecommons.org/licenses/by-nc-nd/4.0/" },
        "cc-by-nc-sa":  { img: "licenses/cc/by-nc-sa",  href: "https://creativecommons.org/licenses/by-nc-sa/4.0/" },
        "cc-by-nc":     { img: "licenses/cc/by-nc",     href: "https://creativecommons.org/licenses/by-nc/4.0/" },
        "cc-by-nd":     { img: "licenses/cc/by-nd",     href: "https://creativecommons.org/licenses/by-nd/4.0/" },
        "cc-by-sa":     { img: "licenses/cc/by-sa",     href: "https://creativecommons.org/licenses/by-sa/4.0/" },
        "cc-by":        { img: "licenses/cc/by",        href: "https://creativecommons.org/licenses/by/4.0/"   },
        "cc-zero":      { img: "licenses/cc/zero",      href: "https://creativecommons.org/publicdomain/zero/1.0/" }
      };

      Object.defineProperties($scope, {
        licenseHref: {
          get() {
            var license = licenses[$scope.license];
            return license.href || "";
          }
        },
        licenseImg: {
          get() {
            var license = licenses[$scope.license];
            return license.img || "";
          }
        },
        licenseTitle: {
          get() {
            var license = licenses[$scope.license];
            return license.title || "";
          }
        }
      });
    }
  };
};
