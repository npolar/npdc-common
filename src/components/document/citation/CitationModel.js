'use strict';

module.exports = function () {
  'ngInject';
  
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
  
  this.uri = (d) => {
    let p = (d.organisations||[]).find(o => o.roles.includes("publisher"));
    if (p) {
      return p;
    } else {
      return { };
    }
  };
  
};