'use strict';

module.exports = function (NpdcDOI, NpdcAPA, NpdcBibTeX) {
  'ngInject';
    
  let self = this;
  
  this.authors = (d) => {

    let authors = [];
    
    if (d && d.people && d.people.length > 0) {
      authors = d.people.filter(p => (p.roles||[]).includes("author"));
    }
    if (!authors || authors.length === 0) {
      if (d && d.organisations && d.organisations.length > 0) {
        authors = d.organisations.filter(o => (o.roles||[]).includes("author"));
      }
    }
    return authors;
  };
  
  this.publisher = (d) => {
    let p = (d.organisations||[]).find(o => o.roles.includes("publisher"));
    if (p) {
      return p;
    } else {
      return { };
    }
  };
  
  this.published_year = (d) => {
    let y;
    if (d && d.released && (/^\d{4}/).test(d.released)) {
      y = new Date(d.released).getFullYear();
    } else {
      y = "not released";
    }
    return y;
  };
  this.year = self.published_year;  
  
  this.uri = (d) => {
    let p = (d.organisations||[]).find(o => o.roles.includes("publisher"));
    if (p) {
      return p;
    } else {
      return { };
    }
  };
  
  // Citation helper
  this.citationMapper = (dataset,
    param={ style: 'apa'
  }) => {
    if (!dataset) {
      return;
    }
    
    let authors = [{ name:'Author'}]; //self.authors(dataset);
    let author = authors;
    let year = 9999; //self.published_year(dataset);
    
    let titles = dataset.titles;
    let title = dataset.title;
    
    let type;
    let pub = { name: 'Publisher' }; // self.publisher(dataset);
    let publisher = pub.name || pub.id;
    let uri = 'URI'; //self.uri(dataset);
    let url = uri;
    let doi = dataset.doi;
    let style = param.style;
    if ((/apa/i).test(style)) {
      type = 'Data set';
      return NpdcAPA.citation({ authors, year, title, type, publisher, uri });
    } else if ((/bibtex/i).test(style)){
      type = '@misc';
      return NpdcBibTeX.bibtex({ title, url, doi, type, publisher, author, year, id: dataset.id });      
    } else if ((/csl/i).test(style)){
      type = 'dataset';
      let issued = { 'date-parts': [year] };
      return {}; //self.csl({ type, DOI: doi, URL: url, title, publisher, issued, author });     
    } else {
      throw `Uknown citation style: ${style}`;
    }
  };
  
  this.citationList = (document, citation=self.citationMapper) => {
    
    let list = [{ text: citation(document, { style: 'apa'}), title: 'APA'},
      { text: citation(document, { style: 'bibtex'}), title: 'BibTeX'},
      { text: citation(document, { style: 'csl'}), title: 'CSL JSON'}
    ];
    if (document.doi) {
      // Use Datacite citation service for publications
      if ((/publication/).test(document.schema)) {
        //{ href: `//data.datacite.org/application/x-bibtex/${document.doi}`, title: 'BibTeX (Datacite)'},
        list = [
          //{ text: citation(document, { style: 'apa'}), title: 'APA'},
          { href: `//citation.datacite.org/format?doi=${document.doi}&style=apa&lang=en-GB`, title: 'APA'},
          { href: `//citation.datacite.org/format?doi=${document.doi}&style=bibtex&lang=en-GB`, title: 'BibTeX'},
          { href: `//api.crossref.org/works/${document.doi}/transform/application/vnd.citationstyles.csl+json`, title: 'CSL JSON'},                    
          { href: `//api.crossref.org/works/${document.doi}/transform/application/x-research-info-systems`, title: 'RIS'}
          //{ href: `//api.crossref.org/works/${document.doi}/transform/application/vnd.crossref.unixref+xml`, title: 'XML'}
        ];
        
      } else {
        //list.push({ href: `https://search.datacite.org/citation?format=ris&doi=${document.doi}`, title: 'RIS'});
        //list.push({ href: `//data.datacite.org/application/x-research-info-systems/${document.doi}`, title: 'RIS'});
      }   
    }
    
    list = list.sort((a,b) => a.title.localeCompare(b.title));
    
    if (document.citation) {
      list = [{ text: document.citation, title: 'Custom'}].concat(list);
    }
    return list;
  };
  
  
};