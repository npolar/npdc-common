'use strict';

module.exports = function (NpdcDOI) {
  'ngInject';
  
  let self = this;
  
  // BibTeX citation
  // Based on http://www.bibtex.org/Format/ and http://citation.datacite.org/format?doi=10.21334/npolar.2016.408e8178&style=bibtex&lang=en-US
  this.bibtex = (param = { type:'@misc', id:'', year:null, title: '', url: '', doi: '', publisher:'', author:null, authors:null }) => {
    
    if (param.author && param.authors) {
      throw "Please provide only author (string) OR authors (array)";
    }
    
    let author;
    if (param.author instanceof Array && param.author.length > 0) {
      author = param.author.map(a => a.name).join(' and ');
    }
    let doi = '';
    if (NpdcDOI.isDoi(param.doi)) {
      doi = `\nDOI="${ param.doi}",\n`;
    }
    return `@${param.type.replace(/^@/, '')}{${ param.doi || param.id },
  title="${ param.title }",
url="${ param.url }",${doi}
publisher="${ param.publisher}",
author="${ author }",
year={${ param.year }}}`;
  };
  
  /*
  @article {ECS2:ECS21213,
author = {Hindell, Mark A. and McMahon, Clive R. and Bester, Marthán N. and Boehme, Lars and Costa, Daniel and Fedak, Mike A. and Guinet, Christophe and Herraiz-Borreguero, Laura and Harcourt, Robert G. and Huckstadt, Luis and Kovacs, Kit M. and Lydersen, Christian and McIntyre, Trevor and Muelbert, Monica and Patterson, Toby and Roquet, Fabien and Williams, Guy and Charrassin, Jean-Benoit},
title = {Circumpolar habitat use in the southern elephant seal: implications for foraging success and population trajectories},
journal = {Ecosphere},
volume = {7},
number = {5},
issn = {2150-8925},
url = {http://dx.doi.org/10.1002/ecs2.1213},
doi = {10.1002/ecs2.1213},
pages = {e01213--n/a},
keywords = {foraging behavior, Mirounga leonina, physical oceanography, population status, sea ice, Southern Ocean water masses},
year = {2016},
note = {e01213},
}
*/
  
  this.citation = self.bibtex;
};