'use strict';

let tabdata = function(npdcCSVService) {
  'ngInject';

  const DELIMITERS = {
    '\t': 'TAB',
    ',': 'COMMA (,)',
    ';': 'SEMICOLON (;)',
    ' ': 'SPACE ( )',
    '|': 'PIPE (|)'
  };

  let applySchemaValueType = function (item, schema) {
    Object.keys(item).forEach(prop => {
      let type;
      if (schema[prop] && (type = schema[prop].type)) {
        if (type instanceof Array) {
          type = type.find(t => t !== 'null') || 'string';
        }

        if (typeof item[prop] !== type) {
          switch (type) {
            case 'string':
              item[prop] = JSON.stringify(item[prop]);
              break;
          }
        }
      }
    });
    return item;
  };

  let disableValueWatchers = function (field) {
    field.items[0].fields.forEach(field => {
      field.destroyWatcher();
    });
  };

  return {
    template: require('./tabdata.html'),
    controller($scope) {
      'ngInject';

      let headers = Object.keys($scope.field.schema.items.properties);
      let delimiter = '\t';

      // We take care of updating values outselves
      disableValueWatchers($scope.field);
      $scope.delimiter = DELIMITERS[delimiter];
      $scope.csvData = npdcCSVService.jsonToCSV($scope.field.value, {headers, delimiter: delimiter});
      let headerString = headers.toString();
      $scope.csvHeader = headerString.replace(/,/g, delimiter);
      $scope.$watch('csvData', (n, o) => {
        if (n && n !== o) {
          let model = {};
          let headerLine = n.split(/\r?\n\r?/)[0];
          let detectedDelimiter = /([\s,;|])/.exec(headerLine)[1];
          $scope.csvHeader = headerLine;
          $scope.delimiter = DELIMITERS[detectedDelimiter];

          if (!npdcCSVService.isMatchingHeaders(npdcCSVService.csvLineToArray(headerLine, detectedDelimiter), headers)) {
            $scope.field.valid = false;
            $scope.field.errors = [{message: "Invalid header line, should use names: " + headerString}];
          } else {
            $scope.field.valid = true;
            $scope.field.errors = null;
            model[$scope.field.id] = npdcCSVService.csvToJSON(n.trim(), {headers, delimiter}).map(item => {
              applySchemaValueType(item, $scope.field.schema.items.properties);
              Object.keys(item).forEach(prop => {
                if (item[prop] === undefined) {
                  delete item[prop];
                }
              });
              return item;
            });
            $scope.field.valueFromModel(model, true);
            // Uncomment to force default delimiter
            // $scope.csvData = $scope.csvData.replace(detectedDelimiter, delimiter, 'g');
          }
        }
      });

      $scope.$watch('csvHeader', (n, o) => {
        if (n && n !== o) {
          $scope.csvData = $scope.csvData.replace(/^.*/, n);
        }
      });
    },
    link(scope, element, attrs) {
      let move = false;
      let lineNumbers = document.createElement('TEXTAREA');
      let textarea = element.find('textarea')[0];
      let noOfLines = scope.csvData.split(/\r?\n\r?/g).length;
      let string = '';
      for (let no = 0; no < noOfLines + 500; no++) {
        if (string.length > 0) {
          string += '&#10;';
        }
        string += no;
      }

      let fontSize = Math.min((40 / noOfLines.toString().length), 15);
      lineNumbers.style.fontSize = fontSize + 'px';
      element[0].querySelector('.header-number').style.fontSize = fontSize + 'px';
      lineNumbers.innerHTML = string;
      lineNumbers.className = 'line-numbers md-input';
      textarea.parentNode.insertBefore(lineNumbers, textarea.nextSibling);

      function setLine() {
        lineNumbers.scrollTop = textarea.scrollTop;
        lineNumbers.style.top = (textarea.offsetTop) + "px";
      }

      textarea.onscroll = textarea.onkeyup = function() {
        setLine();
      };
      textarea.onmousedown = function() {
        setLine();
        move = true;
      };
      textarea.onmouseup = function() {
        setLine();
        move = false;
      };
      textarea.onmousemove = function() {
        if (move) {
          setLine();
        }
      };
      textarea.onkeydown = function(e) {
        if(e.keyCode === 9) { // tab was pressed
          // get caret position/selection
          let start = this.selectionStart;
          let end = this.selectionEnd;

          let target = e.target;
          let value = target.value;

          // set textarea value to: text before caret + tab + text after caret
          target.value = value.substring(0, start) + "\t" + value.substring(end);

          // put caret at right position again (add one for the tab)
          this.selectionStart = this.selectionEnd = start + 1;

          // prevent the focus lose
          e.preventDefault();
        }
      };
    }
  };
};

module.exports = tabdata;
