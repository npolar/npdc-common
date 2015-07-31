'use strict';

require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
var fs = require('fs');
var path = require('path');

var loadScripts = function(type) {
  fs.readdirSync(path.resolve(__dirname, type))
    .filter(name => /(\.(js)$)/i.test(path.extname(name)))
    .forEach(function(script) {
      require(path.join(type, script));
    });
};

loadScripts('layouts');
loadScripts('components');

module.exports = {};
