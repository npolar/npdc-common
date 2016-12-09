"use strict";

var angular = require('angular');
var ui = angular.module('npdcCommon');

ui.directive('npdcDocument', require('./show/document'));
ui.directive('npdcShow', require('./show/document'));

ui.directive('npdcCitation', require('./citation/citationDirective'));
ui.service('NpdcBibTeX', require('./citation/BibTeX'));
ui.service('NpdcAPA', require('./citation/APA'));
ui.service('NpdcCitationModel', require('./citation/CitationModel'));

ui.directive('npdcOrganisations', require('./organisations/organisationsDirective'));
ui.directive('npdcPersons', require('./persons/personsDirective'));
ui.directive('npdcLinks', require('./links/linksDirective'));
ui.directive('npdcData', require('./links/dataDirective'));
ui.directive('npdcDocumentMeta', require('./meta/metaDirective'));

ui.controller('NpdcAuthorsController', require('./authors/AuthorsController'));

ui.directive('npdcAuthors', require('./authors/authorsDirective'));

ui.directive('npdcPlacenames', require('./placenames/placenamesDirective'));
ui.directive('npdcCollection', require('./collection/collectionDirective'));
ui.directive('npdcLicences', require('./licences/licencesDirective'));

ui.directive('npdcBadges', require('./badges/badgesDirective'));
