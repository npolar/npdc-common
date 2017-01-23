'use strict';

let DOI = function() {
  'ngInject';

  let self = this;

  this.isDoi = (str) => {
    return (/^10[.][0-9]+[/].+/).test(str);
  };
  this.isDOI = self.isDoi;

  this.doi = (str) => {
    let doi = '10.'+str.split('10.')[1];
    if (self.isDOI(doi)) {
      return doi;
    }
  };
  this.DOI = self.doi;

  this.uri = (str) => {
    return `https://doi.org/${self.doi(str)}`;
  };

};
module.exports = DOI;