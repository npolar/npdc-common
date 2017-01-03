'use strict';

function warningsDirective() {
  return {
    controller: 'NpdcWarningsController',
    template: require('./warnings.html')
  };
}

module.exports = warningsDirective;