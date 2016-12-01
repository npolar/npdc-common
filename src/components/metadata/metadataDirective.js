'use strict';
// <npdc:metadata document="document" path="resource.path" metadata="{ 'license': 'URI'}"></npdc:metadata>
function metadataDirective() {
  'ngInject';
  
  return {
    scope: {
      metadata: "=?",
      document: "=?",
      path: "=?"
    },
    template: require('./metadata.html'),
    controller: 'NpdcMetadataController'
  };
}

module.exports = metadataDirective;
