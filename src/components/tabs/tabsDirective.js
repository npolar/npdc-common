'use strict';

let angular = require('angular');

let tabsDirective = function($timeout) {
  'ngInject';

  return {
    template: require('./tabs.html'),
    scope: {
      tabs: '=',
      tabactivate: '=?'
    },
    link(scope, element) {
      let duration = 250;

      console.log('tabs', scope.tabs);

      let activate = function (tab) {
        let fieldsetContainer = document.querySelector('.np-tabs');
        if (!fieldsetContainer) {
          return;
        }
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
        if (typeof scope.tabactivate === 'function') {
          scope.tabactivate(tab);
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

      let slideIntoView = function () {
        let fieldsetContainer = document.querySelector('.np-tabs');
        if (fieldsetContainer) {
          let active = fieldsetContainer.querySelector('.np-tab.active');
          if (active) {
            let move = active.getBoundingClientRect().left - fieldsetContainer.getBoundingClientRect().left;
            fieldsetContainer.style.left = -move + 'px';
          }
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

        let i = 0, child = ev.target;
        while ((child = child.previousElementSibling)) {
          i++;
        }

        activate(tab);

        slideIntoView();
      };

      activate(scope.tabs[0]);

      // recalc slide if window is resized
      addEventListener('resize', slideIntoView);


      // Hack to dected if scrollbars are added
      // Demo: http://jsfiddle.net/pFaSx/
      // Create an invisible iframe
      var iframe = document.createElement('iframe');
      iframe.id = "hacky-scrollbar-resize-listener";
      iframe.style.cssText = 'height: 0; background-color: transparent; margin: 0; padding: 0; overflow: hidden; border-width: 0; position: absolute; width: 100%;';

      // Register our event when the iframe loads
      iframe.onload = function() {
        // The trick here is that because this iframe has 100% width
        // it should fire a window resize event when anything causes it to
        // resize (even scrollbars on the outer document)
        iframe.contentWindow.addEventListener('resize', function() {
          try {
            var evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
          } catch(e) {}
        });
      };

      // Stick the iframe somewhere out of the way
      document.body.appendChild(iframe);

    }
  };
};

module.exports = tabsDirective;
