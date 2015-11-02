'use strict';

// @ngInject
var dataDirective = function() {
  return {
    scope: {
      data: '=',
      licenses: '=',
      rights: '='
    },
    template: require('./datatemplate.html'),
    // @ngInject
    controller: function ($scope) {
      $scope.licenceText = function (licence) {
        if (/\/by\//.test(licence)) {
          return 'CC BY';
        } else if (/\/nlod\//.test(licence)) {
          return 'NLOD';
        } else {
          return licence;
        }
      };
    }
  };
};


module.exports = dataDirective;
