$(function () {
  var mockData = function () {
    var posts = [
      {
        coordinates: [69.65196844, 18.96165133]
      },
      {
        coordinates: [78.35669, 15.99936]
      },
      {
        coordinates: [55.765582, 37.681289]
      },
      {
        coverage: [{
          "north": 82,
          "east": 180,
          "south": -78,
          "west": -180
        }],
      }
    ];
    $('.timeline-post').each(function (index, post) {
      $(post).data('post', posts[index]);
    });
  };

  var center = function (x, y) {
    return x + (y-x)/2;
  };

  var coordinatesFromCoverage = function (coverage) {
    return [center(coverage.south, coverage.north), center(coverage.west, coverage.east)];
  };

  var bounds = function (coverage) {
    return [[coverage.south, coverage.west], [coverage.north, coverage.east]];
  };

  var markers = [];
  var initMap = function () {
    var data = $('.timeline-post.active').data('post');
    var coordinates = data.coordinates || coordinatesFromCoverage(data.coverage);
    var map = L.map('map').setView(coordinates, 10);

    $('.timeline-post').each(function (index, post) {
      var data = $(post).data('post');
      if (data.coordinates) {
        data.marker = L.marker(data.coordinates).addTo(map);
      } else if (data.coverage) {
        data.marker = L.rectangle(bounds(data.coverage[0])).addTo(map);
      }

      data.marker.on('click', function () {
        activatePost($(post));
      });

      if ($(post).hasClass('active')) {
        data.marker.setIcon(L.icon({
          iconUrl: 'img/marker-icon-orange.png',
          iconRetinaUrl: 'img/marker-icon-orange-2x.png',
        }));
      }
      markers.push(data.marker);
      $(post).data('post', data);
    });


    var mapquest_attribution = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ';
    var npolar_attribution = 'Data from <a title="npolar.no &mdash; Norsk Polarinstitutt / The Norwegian Polar Institute" href="http://npolar.no">The Norwegian Polar Institute</a>, <a title="Creative Commons Attribution 4.0 International" href="http://creativecommons.org/licenses/by">CC BY 4.0</a> / <a href="http://data.norge.no/nlod/en/1.0" title="Norwegian Licence for Open Government Data">NLOD</a>';
    var attribution = mapquest_attribution + npolar_attribution;
    var opt = {
        url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', //'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg',
        options: {attribution: attribution, subdomains:'1234'}
      };
    L.tileLayer(opt.url, opt.options).addTo(map);

    var osm2 = new L.TileLayer(opt.url, {minZoom: 0, maxZoom: 13, attribution: attribution});
    var miniMap = new L.Control.MiniMap(osm2, {zoomLevelOffset: -7}).addTo(map);
    return map;
  };

  var isOnScreen = function (element) {
    var viewPortHeight = $(window).height(), // Viewport Height
        scrollPosition = $(window).scrollTop(), // Scroll Top
        elementPosition = $(element).offset().top,
        elementHeight = $(element).height();

    return (scrollPosition < elementPosition) &&
      (viewPortHeight + scrollPosition) > (elementPosition + elementHeight);
  };

  var activatePost = function ($post) {
    $currentPost = $('.timeline-post.active');
    var $scrollPost = $('.timeline-post').filter(function (index, post) {
      return $(window).scrollTop() < $(post).offset().top;
    }).first();

    var $postToActivate = $scrollPost;
    if (!$scrollPost.length) {
      $postToActivate = $currentPost;
    }
    if ($post) {
      $postToActivate = $post;
      if (!isOnScreen($post)) {
        window.scrollTo(0, $post.offset().top - 50);
      }
    }

    if (!$currentPost.is($postToActivate)) {
      $currentPost.removeClass('active');
      $postToActivate.addClass('active');
      $currentPost.data('post').marker.setIcon(new L.Icon.Default());
    }

    var data = $postToActivate.data('post');
    if (data.coordinates) {
      map.panTo(data.coordinates);
      map.setZoom(10);
    } else if (data.coverage) {
      map.fitBounds(bounds(data.coverage[0]));
    }

    data.marker.setIcon(L.icon({
      iconUrl: 'img/marker-icon-orange.png',
      iconRetinaUrl: 'img/marker-icon-orange-2x.png',
    }));

  };

  $(window).scroll(function(event) {
    activatePost();
  });

  var initPopovers = function () {
    $('[data-toggle="popover"]').popover({
      placement: 'bottom',
      trigger: 'click',
      html : true,
      title: function() {
        return $(this).siblings('.popover-wrapper').find('.popover-head').html();
      },
      content: function() {
        return $(this).siblings('.popover-wrapper').find('.popover-content').html();
      }
    }).on('shown.bs.popover', function() {
      $(this).siblings('.popover').find('input:first').focus();
    });

    $(document).on('blur','.popover', function() {
      var $elem = $(this);
      setTimeout(function () {
        if ($elem.find(':focus').length === 0) {
          $elem.popover('hide');
          $elem.remove();
        }
      }, 10);
    });
  };

  var getUrlParameter = function (sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1] || null;
        }
    }
  };

  var login = function () {
    $('main').load('user.html');
  };

  $('.timeline-post').click(function () {
    activatePost($(this));
    return false;
  });

  $('body').on('click', '.do-login', function () {

  });

  mockData();
  initPopovers();
  var map = initMap();
  activatePost($('.timeline-post.active'));

  if(getUrlParameter('user') !== undefined) {
    login();
  }
});
