# npdc-common
[![Build Status](https://travis-ci.org/npolar/npdc-common.svg?branch=master)](https://travis-ci.org/npolar/npdc-common)

npdc-common is a collection of core npdc-app components such as layout, theme, formula templates, search, navigation, menus etc.
This is bundled and deployed separately from any app as a versioned shared library.

## Formula material components
See [src/components/formula/REAMDE.md](src/components/formula/)

## Develop

    npm install
    gulp

To run together with an app:

In `npdc-common`
```sh
$ npm link
```

In your app
```sh
$ npm link npdc-common
```


      "Alle	data som eies	av Norsk Polarinstitutt skal være åpent og kostnadsfritt tilgjengelige for videre bruk"
      " All data owned by the Norwegian Polar Institute should be open and free for further use "
    
      This website is open source ... and built using only open search technologies
      Open data from the Npolar APIs are CC-BY-4 unless otherwise noted
      (where is otherwise? => metadata of dataset and/or service metadata )