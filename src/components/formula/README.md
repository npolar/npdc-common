# Material design template for formula
## Usage
In controller:

    $scope.formulaData = {
      schema: "http://some.url.com/schema.json",
      form: "./form.json",
      template: "template.html"
    };

In template:

    <div formula="formulaData" flex></div>

## UI types
The material template introduces some new UI types for formula.

### File uploader
To use file uploader for a field either reference the file scheme:

    "$ref": "url-to-file-schema"

Or set format in the form definition:

    {
      "id": "string_file",
      "format": "file-uri"
    }
