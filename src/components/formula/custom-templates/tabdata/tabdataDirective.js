'use strict';

/**
 * @ngInject
 */
let tabdata = function(npdcCSVService) {

  return {
    template: require('./tabdata.html'),
    //@ngInject
    controller($scope) {
      $scope.csvData = npdcCSVService.jsonToCSV($scope.field.value);
      let headers = $scope.field.fields[0].fields.map(field => field.id);
      $scope.$watch('csvData', (n, o) => {
        if (n && n !== o) {
          let model = {};
          model[$scope.field.id] = npdcCSVService.csvToJSON(n, headers);
          $scope.field.valueFromModel(model);
        }
      });
    },
    link(scope, element, attrs) {
      var move = false;
      var lineNumbers = document.createElement('TEXTAREA');
      var textarea = element.find('textarea')[0];

      var string = '';
      for (var no = 1; no < 300; no++) {
        if (string.length > 0) {
          string += '&#10;';
        }
        string += no;
      }
      lineNumbers.className = 'line-numbers md-input';
      lineNumbers.innerHTML = string;
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
    }
  };
};

module.exports = tabdata;
