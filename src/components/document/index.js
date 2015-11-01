"use strict";

var angular = require('angular');
var ui = angular.module('npdcUi');

ui.directive('npdcDocument', require('./show/document'));
ui.directive('npdcShow', require('./show/document'));
ui.directive('npdcCitation', require('./citation/citationDirective'));
ui.directive('npdcOrganisation', require('./organisation/organisationDirective'));
ui.directive('npdcPerson', require('./person/personDirective'));
ui.directive('npdcLinks', require('./links/linksDirective'));
ui.directive('npdcDocumentMeta', require('./meta/metaDirective'));
ui.directive('npdcAuthors', require('./authors/authorsDirective'));
