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

  return {
    template: require('./tabdata.html'),
    //@ngInject
    controller($scope) {
      let headers = Object.keys($scope.field.schema.items.properties);
      let delimiter = ';';
      $scope.delimiter = DELIMITERS[delimiter];
      $scope.csvData = npdcCSVService.jsonToCSV($scope.field.value, {headers, delimiter: delimiter});
      let headerString = headers.toString();
      $scope.csvHeader = headerString.replace(/,/g, delimiter);
      $scope.$watch('csvData', (n, o) => {
        if (n && n !== o) {
          let model = {};
          let headerLine = n.split(/\r?\n\r?/)[0];
          let detectedDelimiter = /([\t\s,;|])/.exec(headerLine)[1];
          $scope.csvHeader = headerLine;
          $scope.delimiter = DELIMITERS[detectedDelimiter];

          if (!npdcCSVService.isMatchingHeaders(npdcCSVService.csvLineToArray(headerLine, detectedDelimiter), headers)) {
            $scope.field.valid = false;
            $scope.field.errors = [{message: "Invalid header line, should use names: " + headerString}];
          } else {
            $scope.field.valid = true;
            $scope.field.errors = null;
            model[$scope.field.id] = npdcCSVService.csvToJSON(n, {headers, delimiter}).map(item => {
              applySchemaValueType(item, $scope.field.schema.items.properties);
              Object.keys(item).forEach(prop => {
                if (item[prop] === undefined) {
                  delete item[prop];
                }
              });
              return item;
            });
            $scope.field.valueFromModel(model);
            $scope.csvData.replace(detectedDelimiter, delimiter, 'g');
            $scope.$emit('revalidate');
          }
        }
      });
    },
    link(scope, element, attrs) {
      let move = false;
      let lineNumbers = document.createElement('TEXTAREA');
      let textarea = element.find('textarea')[0];
      let noOfLines = scope.csvData.split('\r?\n\r?').length;
      let string = '';
      for (let no = 0; no < Math.max(noOfLines + 500); no++) {
        if (string.length > 0) {
          string += '&#10;';
        }
        string += no;
      }
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
