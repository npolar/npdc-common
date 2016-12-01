'use strict';

module.exports = function (NpdcDOI) {
  'ngInject';
  
  this.citation = (param={ authors:[], year:null, title:'', type:'Data set', publisher:'', uri:''}) => {
    // @todo handle authors as array of strings or string
    let who = param.authors.map(a => {
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
    
    // Handle 0,1,2-6,7- authors
    if (who.length === 0) {
      who = '';
    } else if (who.length === 1) {
      who = who[0].apa;
    } else if (who.length >= 2) {
      let last = who.pop();
      if (who.length <= 7) {
        who = who.map(a => a.apa).join(', ').trim() +', & '+ last.apa;
      } else {
        who = who.slice(0,6).map(a => a.apa).join(', ').trim() +', … '+ last.apa;
      }
    }
    
    return `${who} (${param.year}).
  ${ param.title } [${param.type}].
  ${ param.publisher }. ${ param.uri }`;
      
  };
}