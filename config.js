'use strict';

var pkg = require('./package.json');

var config = function(baseConfig) {
  return {
    'pkg': pkg,
    'pkgname': pkg.name,
    'version': function () {return pkg.version;},
    name: 'assets',
    deps: {
      css: [
        'node_modules/angular-material/angular-material.css',
        'node_modules/jusas-angularjs-slider/dist/rzslider.css',
        baseConfig.src.root + '/material-icons.css',
        'node_modules/chronopic/dist/css/chronopic-ext-md.min.css',
        'node_modules/chronopic/dist/css/chronopic.min.css'
      ].concat(baseConfig.deps.css),
      sharedAssets: ['node_modules/material-design-icons/iconfont/*']
    },
    dist: {
      approot: baseConfig.dist.root + '/demo',
      bundleName: 'demos.js',
      sharedAssets: baseConfig.dist.root + '/assets',
      sass: baseConfig.dist.root + '/assets'
    },
    src: {
      app: baseConfig.src.root + '/**/*Demo.js',
      sassMain: [baseConfig.src.root + '/main.scss'],
      sassAll: [baseConfig.src.root + '/**/*.scss'],
      html: [baseConfig.src.root + '/**/index.html'],
      config: [],
      assets: [baseConfig.src.root+'/**/*.{ico,png,jpg,jpeg,gif}']
    },
    dirListings: true,
    templateRoot: 'npdc-common/src'
  };
};

module.exports = config;
