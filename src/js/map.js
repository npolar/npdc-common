$(function () {
  var m = L.map('map').setView([69.65196844, 18.96165133], 15);

  var mapquest_attribution = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ';
  var npolar_attribution = 'Data from <a title="npolar.no &mdash; Norsk Polarinstitutt / The Norwegian Polar Institute" href="http://npolar.no">The Norwegian Polar Institute</a>, <a title="Creative Commons Attribution 4.0 International" href="http://creativecommons.org/licenses/by">CC BY 4.0</a> / <a href="http://data.norge.no/nlod/en/1.0" title="Norwegian Licence for Open Government Data">NLOD</a>';
  var attribution = mapquest_attribution + npolar_attribution;
  var opt = {
      url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg',
      options: {attribution: attribution, subdomains:'1234'}
    };
  L.tileLayer(opt.url, opt.options).addTo(m);
  console.log('map done');
});
