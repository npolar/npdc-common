'use strict';

module.exports = function (NpdcDOI) {
  'ngInject';
  
  let self = this;
  
  // BibTeX citation
  // Based on http://www.bibtex.org/Format/ and http://citation.datacite.org/format?doi=10.21334/npolar.2016.408e8178&style=bibtex&lang=en-US
  this.bibtex = (param = { type:'@misc', id:'', year:null, title: '', url: '', doi: '', publisher:'', author:null, authors:null }) => {
    
    if (param.author && param.authors.length > 0) {
      throw "Please provide only author (string) OR authors (array)";
    }
    
    let author;
    if (param.author instanceof Array && param.author.length > 0) {
      author = param.author.map(a => a.name).join(' and ');
    }
    let doi = '';
    if (NpdcDOI.isDoi(param.doi)) {
      doi = `
      DOI="\n${ param.doi}",`;
    }
    return `@${param.type.replace(/^@/, '')}{${ param.doi || param.id },
  title="${ param.title }",
url="${ param.url }",${doi}
publisher="${ param.publisher}",
author="${ author }",
year={${ param.year }}}`;
  };
  
  this.citation = self.bibtex;
};