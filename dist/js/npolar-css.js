$(function () {
  var mockData = function () {
    var posts = [
      {
        lat: 69.65196844,
        lng: 18.96165133
      },
      {
        lat: 78.35669,
        lng: 15.99936
      }
    ];
    $('.timeline-post').each(function (index, post) {
      $(post).data("coordinates", posts[index]);
    });
  };

  var initMap = function () {
    var coordinates = $.map($('.timeline-post.active').data('coordinates'), function (value) { return value; });
    var map = L.map('map').setView(coordinates, 10);

    var mapquest_attribution = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ';
    var npolar_attribution = 'Data from <a title="npolar.no &mdash; Norsk Polarinstitutt / The Norwegian Polar Institute" href="http://npolar.no">The Norwegian Polar Institute</a>, <a title="Creative Commons Attribution 4.0 International" href="http://creativecommons.org/licenses/by">CC BY 4.0</a> / <a href="http://data.norge.no/nlod/en/1.0" title="Norwegian Licence for Open Government Data">NLOD</a>';
    var attribution = mapquest_attribution + npolar_attribution;
    var opt = {
        url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', //'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg',
        options: {attribution: attribution, subdomains:'1234'}
      };
    L.tileLayer(opt.url, opt.options).addTo(map);

    var osm2 = new L.TileLayer(opt.url, {minZoom: 0, maxZoom: 13, attribution: attribution});
    var miniMap = new L.Control.MiniMap(osm2).addTo(map);
    return map;
  };

  var markers = [];
  var activatePost = function ($post) {
    $.each(markers, function (index, marker) {
      map.removeLayer(marker);
    });
    markers = [];
    var coordinates = $.map($post.data('coordinates'), function (value) { return value; });
    var marker = L.marker(coordinates).addTo(map);
    map.panTo(coordinates);
    markers.push(marker);
  };

  $(window).scroll(function(event) {
    currentPost = $('.timeline-post.active');
    var activePost = $('.timeline-post').filter(function (index, post) {
      return $(window).scrollTop() < $(post).offset().top;
    }).first();
    if (!activePost.length) {
      activePost = currentPost;
    }
    if (!currentPost.is(activePost)) {
      currentPost.removeClass('active');
      activePost.addClass('active');
      activatePost(activePost);
    }
  });

  mockData();
  var map = initMap();
  activatePost($('.timeline-post.active'));
});
