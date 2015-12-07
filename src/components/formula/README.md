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

### Autocomplete
Autocomplete is available for string fields and is configured in the form definition in any of these ways:

    {
      "id": "autocomplete_array",
      "autocomplete": ["Dalene", "Allan"] <- static array
    },
    {
      "id": "autocomplete_url",
      "autocomplete": "//api.npolar.no/" <- GET returns array
    },
    {
      "id": "autocomplete_fn",
      "autocomplete": "foobar" <- function returns array
    },
    {
      "id": "autocomplete_obj",
      "autocomplete": {
        "source": "http://api.npolar.no/publication/?q=&fields=people.email&format=json&variant=array&limit=5",
        "callback": "emailCallback" <- callback returns array
      }
    }

Callback functions are defined via ```npdcAutocompleteSourceService``` like so:

    npdcAutocompleteSourceService.defineSourceFunction("emailCallback", function (response) {
      // return a array here
    });

If the source is an url new results will be fetched with ```?q=value``` for each input change.
