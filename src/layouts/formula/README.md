# Usage
## js
In controller:

    $scope.formulaData = {
      schema: "./demo/schema.json",
      form: "./demo/form.json",
      template: "template.html"
    };

## html

    <md-content layout="row" class="md-padding">
      <div formula="formulaData" flex></div>
    </md-content>
