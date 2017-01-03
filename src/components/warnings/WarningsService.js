'use strict';

// Set and get warnings and notices (for a document)
// Example of setting warnings:
// * NpdcWarningsService.warnings[dataset.id] = DatasetModel.warnings(dataset);
function NpdcWarningsService() {
  'ngInject';

  //let self = this;

  // Holds warnings for each document (key: $routeParam.id)
  this.warnings = {};

  // Holds notices for each document (key: $routeParam.id)
  this.notices = {};

  return this;
}

module.exports = NpdcWarningsService;
