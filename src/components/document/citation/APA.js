'use strict';

module.exports = function (NpdcDOI) {
  'ngInject';

  let self = this;

  // Handle 0,1,2-6,7- authors
  this.apa_style_list = (who) => {
    if (who.length === 0) {
      who = '';
    } else if (who.length === 1) {
      who = who[0];
    } else if (who.length >= 2) {
      let last = who.pop();
      if (who.length <= 7) {
        who = who.join(', ').trim() +', & '+ last;
      } else {
        who = who.slice(0,6).join(', ').trim() +', … '+ last;
      }
    }
    return who;
  };

  this.authors = (authors) => {
    let who = authors.map(a => {
      // @todo has .apa?
      if (a.last_name && a.first_name) {
        a.initials = a.first_name.split(' ').map(c => c[0]);
        a.apa = `${a.last_name}, ${a.initials.join('. ')+'. '}`.trim();
        if (!a.name) {
          a.name = `${a.first_name} ${a.last_name}`;
        }
      } else if (a.name) {
        a.apa = a.name;
      } else {
        a.apa = '';
      }
      return a;
    });
    return self.apa_style_list(who.map(a => a.apa));

  };

  this.citation = (param={ authors:[], year:null, title:'', type:'Data set', publisher:'', uri:''}) => {
    // @todo handle authors as array of strings or string
    return `${ self.authors(param.authors) } (${param.year}).
  ${ param.title } [${param.type}].
  ${ param.publisher }. ${ param.uri }`;
  };

  this.reference = (authors, year) => {
    return `${ self.authors(authors) } (${ year })`;
  };

};