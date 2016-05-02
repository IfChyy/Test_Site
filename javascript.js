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
var yourPosition;


function initMap()
{


    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
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

                infowindow = new google.maps.InfoWindow();
                yourPosition = new google.maps.InfoWindow({map: map,position: pos,content: 'You Are Here'});

                var request = {location:pos,radius:2500,types: ['bar']};

                map.setCenter(pos);


                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request,callback);

        //sipi  GAZ BATE
         //   var mylatlng = new google.maps.LatLng(pos.lat, pos.lng);
           // var lat = mylatlng.lat();
           // var lng = mylatlng.lng();

            function find_closest_marker( lat, lng ) {
                var pi = Math.PI;
                var R = 6371; //equatorial radius
                var distances = [];
                var closest = -1;

                for( i=0;i<markers.length; i++ ) {
                    var lat2 = pos.lat;
                    var lon2 = pos.lng;

                    var chLat = lat2-lat;
                    var chLon = lon2-lng;

                    var dLat = chLat*(pi/180);
                    var dLon = chLon*(pi/180);

                    var rLat1 = lat*(pi/180);
                    var rLat2 = lat2*(pi/180);

                    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    var d = R * c;

                    distances[i] = d;
                    if ( closest == -1 || d < distances[closest] ) {
                        closest = i;
                    }
                }

                // (debug) The closest marker is:
                console.log(markers[closest]);
            }













            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            
            directionsDisplay.setMap(map);
            var request = {
                origin:  {lat:  pos.lat, lng: pos.lng},
                destination: 'Glasgow',
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });







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


/**
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    //57.119234, -2.138756
    var myLatLng = new google.maps.LatLng({lat:  pos.lat, lng: pos.lng});

    //var myLatLng = new google.maps.LatLng({lat:  57.119234, lng: -2.138756});
    directionsDisplay.setMap(map);
    var request = {
        origin:  myLatLng,
        destination: 'Glasgow',
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

*/




}
google.maps.event.addDomListener(window, 'load', initMap);



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
