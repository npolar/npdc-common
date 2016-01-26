'use strict';

/**
 * @ngInject
 */
let csvService = function() {

  const DEFAULT_DELIMITER = ",";

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

  let csvToJSON = function(csv, headers, options = { delimiter: DEFAULT_DELIMITER }) {
    let lines = csv.split(/\r?\n\r?/);
    if (!headers) {
      headers = csvLineToArray(lines.shift());
    }

    return lines.map(line => {
      let record =  csvLineToArray(line, options.delimiter).reduce((memo, item, index) => {
        if (index < headers.length) {
          memo[headers[index]] = parseValue(item);
        }
        return memo;
      }, {});

      // fill missing values with undefined
      for (let i = headers.length - 1; i >= 0; i--) {
        if (record.hasOwnProperty([headers[i]])) {
          break;
        } else {
          record[headers[i]] = undefined;
        }
      }

      return record;
    });
  };

  let jsonToCSV = function(json, options = { delimiter: DEFAULT_DELIMITER }) {
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
