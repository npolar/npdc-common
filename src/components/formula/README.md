# Material tabs performance issue
https://github.com/angular/material/issues/5681

# Material design templates for formula

Configure templates via ```formula``` service, either at bootstrap or by ```formula.addTemplate()``` at any time.

## File uploader
There is a file upload widget for both a text field, in which case the uri to the file will be stored,
and for objects in which case the uri, filename, size etc. is stored. This is just a wrapper for filefunnel.

    <npdc:formula-file></npdc:formula-file>

## Autocomplete
Autocomplete is available for string fields and is configured via ```formulaAutoCompleteService``` in any of these ways:

    formulaAutoCompleteService.autocomplete({
      match: [String, Function] (See formulas formulaFieldConfig)
      querySource: [String (uri), Array, Function],
      label: [String (key), Function],
      value: [String (key), Function],
      onSelect: [Function],
      minLenght: [Number] (default 0)
    }, $scope.formula);

    formulaAutoCompleteService.autocompleteFacets(['organisations.gcmd_short_name', 'links.type'], Dataset, $scope.formula);


## Tabdata
Delimiter separated values widget to enable easy integration with spreadsheets.


If the source is an url new results will be fetched with ```?q=value``` for each input change.

# Domain specific templates
* GCMD
  * gcmd object: ```<npdc:formula-gcmd></npdc:formula-gcmd>```
    - this will only render sciencekeywords and hide all other gcmd properties.
  * sciencekeywords: ```<npdc:formula-gcmd-keyword></npdc:formula-gcmd-keyword>```
* persons: ```<npdc:formula-person></npdc:formula-person>```
* placenames: ```<npdc:formula-placename></npdc:formula-placename>```
