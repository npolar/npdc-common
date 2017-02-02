'use strict';
// <npdc:metadata document="document" resource="resource"></npdc:metadata>
function metadataDirective() {
  'ngInject';

  return {
    scope: {
      resource: "=?",
      document: "=?",
      metadata: "=?",

    },
    template: require('./metadata.html'),
    controller: 'NpdcMetadataController'
  };
}

module.exports = metadataDirective;