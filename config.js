'use strict';

var pkg = require('./package.json');

var config = function(baseConfig) {
  return {
    'pkg': pkg,
    'pkgname': pkg.name,
    'version': function () {return pkg.version;},
    deps: {
      css: [
        require.resolve('angular-material/angular-material.css'),
        require.resolve('jusas-angularjs-slider/dist/rzslider.css'),
        baseConfig.src.root + '/material-icons.css'
      ].concat(baseConfig.deps.css),
      sharedAssets: [require.resolve('material-design-icons').replace('index.html', '') + 'iconfont/*']
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
