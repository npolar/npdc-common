'use strict';

let tabsDirective = function() {
  'ngInject';

  return {
    template: require('./tabs.html'),
    link(scope, element) {
      let duration = 250;

      let animateHorizontalScroll = function (elem, stop) {
        let step = 25;
        let steps = duration / step;
        let start = elem.scrollLeft;
        let length = stop - start;
        let increment = length / steps;
        if (length !== 0) {
          let timer = setInterval(function () {
            if (((length > 0) && (elem.scrollLeft + increment >= stop)) ||
              ((length < 0) && (elem.scrollLeft + increment <= stop))) {
              elem.scrollLeft = stop;
              clearInterval(timer);
            } else {
              elem.scrollLeft += increment;
            }
          }, step);
          setTimeout(function () {
            clearInterval(timer);
          }, duration + 10);
        }
      };

      scope.next = function () {
        let scrollContainer = element[0].querySelector('.md-virtual-repeat-scroller');
        let scroll = scrollContainer.scrollLeft;
        animateHorizontalScroll(scrollContainer, scroll + 180);
      };

      scope.back = function () {
        let scrollContainer = element[0].querySelector('.md-virtual-repeat-scroller');
        let scroll = scrollContainer.scrollLeft;
        animateHorizontalScroll(scrollContainer, scroll - 180);
      };

      scope.go = function (ev, fieldset) {
        let tabsContainer = element[0].querySelector('md-virtual-repeat-container');
        let scrollContainer = element[0].querySelector('.md-virtual-repeat-scroller');
        let scrollPos = scrollContainer.scrollLeft;
        let width = tabsContainer.clientWidth;
        let offset = ev.target.offsetLeft;
        let elemWidth = ev.target.offsetWidth;
        if (scrollPos > offset) {
          animateHorizontalScroll(scrollContainer, offset);
        } else if ((scrollPos + width) < (offset + elemWidth)) {
          animateHorizontalScroll(scrollContainer, offset - width + elemWidth);
        }

        scope.form.activate(fieldset);

        let fieldsetContainer = document.querySelector('.np-formula-fieldsets');
        let i = -2, child = ev.target; // FIXME why -2 ??
        while ((child = child.previousSibling)) {
          i++;
        }
        let tabFieldset = document.querySelectorAll('.np-formula-tab')[i];
        fieldsetContainer.style.left = -tabFieldset.offsetLeft + 'px';
      };
    }
  };
};

module.exports = tabsDirective;
