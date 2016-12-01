'use strict';

let DOI = function() {
  'ngInject';
  
  this.isDoi = (str) => {
    return (/^10[.][0-9]+[/].+/).test(str);
  };
}
module.exports = DOI;