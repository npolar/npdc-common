'use strict';

var licencesDirective = function() {
  'ngInject';

  return {
    scope: {
       docLicenses: '=licences'
    },
    template: require('./licences.html'),
    controller($scope) {
      'ngInject';

      let cc = /creativecommons/;
      let nlod = /nlod/;

      $scope.licences = ($scope.docLicenses || []).map(l => {
        let licence = {
          href: l
        };
        if (cc.test(l)) {
          licence.class = 'cc';
        } else if (nlod.test(l)) {
          licence.class = 'nlod';
          licence.text = 'NLOD 1.0';
        }
        return licence;
      });
    }
  };
};


module.exports = licencesDirective;
