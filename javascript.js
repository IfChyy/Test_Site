/**
 * Created by azifchyy on 22.4.2016 г..
 */

window.fbAsyncInit = function() {
    FB.init({
        appId      : '322156051141744',
        xfbml      : true,
        version    : 'v2.6'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0] ;
    if (d.getElementById(id)) {return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




var map;
var pos;
var infowindow;

function initMap()
{


    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 13
    });

    //HTML5 geolocation
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
            {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infowindow = new google.maps.InfoWindow({map: map,position: pos,content: 'You Are Here'});

                var request = {location:pos,radius:2500,types: ['bar']};

                map.setCenter(pos);


                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request,callback);

            },

            function()
            {
                handleNoGeolocation(true);
            });
    }
    else
    {
        handleNoGeolocation(false);
    }

    function callback(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });



        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });


    }


    var route = new google.maps.DirectionsService;


    var point1 = new google.maps.LatLng(pos);
    var point2 = new google.maps.LatLng(57.143533,-2.124983);

    var wps = [{ location: point1 }, { location: point2 }];

    var org = new google.maps.LatLng ( -33.89192157947345,151.13604068756104);
    var dest = new google.maps.LatLng ( -33.69727974097957,150.29047966003418);

    var request = {
        origin: org,
        destination: dest,
        waypoints: wps,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };





}
google.maps.event.addDomListener(window, 'load', initMap);



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
