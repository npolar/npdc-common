# npolar-css
npolar CSS framework bulit on top of https://material.angularjs.org

# Usage
Javascript is exposed as a CommonJs module, so just require();
Copy \*.css and /img to your target.

## Iconset
Material icons (https://www.google.com/design/icons/) available as font ligatures.
Eg. ```<md-icon>phone</md-icon>```

## Directives & Services
Individual components are documented in ```src/components/*/README.md```
See base services and directives at https://material.angularjs.org

# Development
You will need node and gulp installed on your machine. Then:

`npm install`
`gulp`

## Structure
Each component or layout has its own sass, js, spec, html and readme file.

## Demos
Demo code should be named \*Demo.js and must not be required by production code.
Demo code don't have a browserify build on them, just use normal script tags.
