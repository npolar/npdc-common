'use strict';

var dataDirective = function() {
  'ngInject';

  return {
    scope: {
      data: '=',
      licenses: '=',
      rights: '='
    },
    template: require('./datatemplate.html'),
    controller: function ($scope) {
      'ngInject';
      
      $scope.licenceText = function (licence) {
        return licence;
        /*if (/\/by\//.test(licence)) {
          return 'CC BY';
        } else if (/\/nlod\//.test(licence)) {
          return 'NLOD';
        } else {
          return licence;
        }*/
      };
    }
  };
};


module.exports = dataDirective;
