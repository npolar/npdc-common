'use strict';

let angular = require('angular');

let tabsDirective = function($timeout) {
  'ngInject';

  return {
    template: require('./tabs.html'),
    scope: {
      tabs: '=',
      onactivate: '=?'
    },
    link(scope, element) {
      let duration = 250;
      let fieldsetContainer = document.querySelector('.np-tabs');

      let activate = function (tab) {
        let tabNodes = fieldsetContainer.querySelectorAll('.np-tab');
        scope.tabs.forEach(function(t, i) {
          let $tab = angular.element(tabNodes[i]);
          if (typeof tab === 'object' || typeof tab === 'number') {
            if ((typeof tab === 'object') ? (t === tab) : (i === tab)) {
              t.active = true;
              $tab.addClass('active');
            } else {
              t.active = false;
              $tab.removeClass('active');
            }
          }
        });
        if (typeof scope.onactivate === 'function') {
          scope.onactivate(tab);
        }
      };

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

      scope.go = function (ev, tab) {
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

        let fieldsetContainer = document.querySelector('.np-tabs');
        let i = 0, child = ev.target;
        while ((child = child.previousElementSibling)) {
          i++;
        }

        activate(tab);

        // slide tab into view
        $timeout(() => {
          let active = fieldsetContainer.querySelector('.np-tab.active');
          let move = active.getBoundingClientRect().left - fieldsetContainer.getBoundingClientRect().left;
          fieldsetContainer.style.left = -move + 'px';
        });
      };

      activate(scope.tabs[0]);
    }
  };
};

module.exports = tabsDirective;
