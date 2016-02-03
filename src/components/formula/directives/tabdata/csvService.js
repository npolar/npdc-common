'use strict';

let csvService = function() {
  'ngInject';

  const DEFAULT_DELIMITER = ",";
  const NEWLINE = "\r\n";

  let isBoolean = function (value) {
    return ["true", "false"].indexOf(value.toLowerCase()) !== -1;
  };

  let parseValue = function(value) {
    let num, parsed;
    if (value === undefined) {
      return undefined;
    } else if (value.toLowerCase() === "nan") {
      parsed = NaN;
    } else if(!isNaN(num = Number(value))) {
      parsed = num;
    } else if (isBoolean(value)) {
      parsed = JSON.parse(value.toLowerCase());
    } else {
      parsed = value;
    }
    return parsed;
  };

  let csvLineToArray = function(str, delimiter = DEFAULT_DELIMITER) {

    let quotedValues = [],
      values, match;
    let expr = RegExp("([\"']{1}).*?(?=\\1\\s*(?:" + delimiter + "|$))", "g");

    (str.match(expr) || [])
    .forEach(function(quoted, index) {
      quotedValues.push(quoted.replace(/["']/, ""));
      str = str.replace(quoted, "{{%" + index + "%}}");
    });

    ((values = str.split(delimiter) || []))
    .forEach(function(value, index, array) {
      if ((match = value.match(/{{%(\d+)%}}/))) {
        value = quotedValues[Number(match[1])];
      }
      value = value.trim();
      value = value === '' ? undefined : value;
      array[index] = value;
    });

    return values;
  };

  let isMatchingHeaders = function (h1, h2) {
    return h1 && h2 && h1.every(header => h2.indexOf(header) !== -1);
  };

  let csvToJSON = function(csv, options = { delimiter: DEFAULT_DELIMITER }) {
    let lines = csv.split(/\r?\n\r?/).filter(line => line !== '');
    let firstLine = csvLineToArray(lines[0], options.delimiter);

    if (!options.headers || isMatchingHeaders(firstLine, options.headers)) {
      options.headers = firstLine;
      lines.shift();
    }

    return lines.map(line => {
      let record = csvLineToArray(line, options.delimiter).reduce((memo, item, index) => {
        if (index < options.headers.length) {
          memo[options.headers[index]] = parseValue(item);
        }
        return memo;
      }, {});

      // fill missing values with undefined
      for (let i = options.headers.length - 1; i >= 0; i--) {
        if (record.hasOwnProperty([options.headers[i]])) {
          break;
        } else {
          record[options.headers[i]] = undefined;
        }
      }

      return record;
    });
  };

  let jsonToCSV = function(json, options) {
    options = Object.assign({ delimiter: DEFAULT_DELIMITER, skipHeaders: false }, options);
    if (!options.headers) {
      throw "No CSV header specified";
    }

    let values = (json instanceof String) ? JSON.parse(json) : json;
    let csv = '';

    if (!options.skipHeaders) {
      csv += options.headers.toString().replace(/,/g, options.delimiter) + NEWLINE;
    }

    values.forEach((item, rowIndex) => {
      options.headers.forEach((header, colIndex) => {
        if (item[header] !== undefined) {
          csv += item[header];
          if (colIndex < Object.keys(item).length - 1) {
            csv += options.delimiter;
          }
        }
      });
      if (rowIndex < values.length - 1) {
        csv += NEWLINE;
      }
    });

    return csv;
  };

  return {
    jsonToCSV,
    csvToJSON,
    csvLineToArray,
    isMatchingHeaders
  };
};

module.exports = csvService;
