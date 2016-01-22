'use strict';

/**
 * @ngInject
 */
let csvService = function() {

  let csvToJSON = function(csv, headers, options = { delimiter: "," }) {
    let valuesRegExp = new RegExp('\s?(?:(".*?")(?:'+options.delimiter+'|\n|$)|([^'+options.delimiter+'"]+))','g');
    return csv.split("\n").map(line => {
      let match;
      let item = {};
      let i = 0;
      while ((match = valuesRegExp.exec(line))) {
        item[headers[i]] = match[0];
        i++;
      }
      return item;
    });
  };

  let jsonToCSV = function(json, options = { delimiter: "," }) {
    let values = (json instanceof String) ? JSON.parse(json) : json;
    let csv = '';
    values.forEach((item, rowIndex) => {
      Object.keys(item).forEach((key, colIndex, line) => {
        csv += item[key];
        if (colIndex < line.length - 1) {
          csv += options.delimiter;
        }
      });
      if (rowIndex < values.length - 1) {
        csv += "\r\n";
      }
    });
    return csv;
  };

  return {
    jsonToCSV,
    csvToJSON
  };
};

module.exports = csvService;
