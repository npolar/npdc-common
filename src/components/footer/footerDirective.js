"use strict";

// @ngInject
let footer = function () {
    return {
      template: require('./footer.html'),
      link(scope, element) {
        var updateCallback = function () {
          var scroller = element[0].querySelector("#scroll-up");
          var scrollY = window.pageYOffset;

          if(scrollY >= 100) {
            scroller.style.transform = "scale(1.0)";
          } else {
            scroller.style.transform = "scale(0.0)";
          }
        };

        window.addEventListener("scroll", updateCallback);
        window.addEventListener("resize", updateCallback);
        updateCallback();
      }
    };
  };

module.exports = footer;
