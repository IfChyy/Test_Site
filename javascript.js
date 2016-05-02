/**
 * Created by azifchyy on 22.4.2016 г..
 */
/* creating a function to share the website on facebook page or peoples timelines */
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


/* variables for the google map api's*/
var map;
var pos;
var infowindow;
var yourPosition;


/* initialise map funciton to create the map */
function initMap()
{

/* map variable with center location and zoom */
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    /* geolocation to get the client location */
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
/* get the location and put a link saying to the client that he is here */
            infowindow = new google.maps.InfoWindow();
            yourPosition = new google.maps.InfoWindow({map: map,position: pos,content: 'You Are Here'});
/* request for radius and possition looking for bars around the client */
            var request = {location:pos,radius:2500,types: ['bar']};

            map.setCenter(pos);
/* variable for initialising the places ( near bars ) */
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request,callback);


/* direction services bars for direction on map */
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            
            directionsDisplay.setMap(map);
            var request = {
                origin:  {lat:  pos.lat, lng: pos.lng},
                destination: 'Aberdeen',
                travelMode: google.maps.DirectionsTravelMode.WALKING
            };
/* direction route on map */
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        },
/* function to handle if the client has blocked his gps services */
            function()
            {
                handleNoGeolocation(true);
            });
    }
    else
    {
        handleNoGeolocation(false);
    }
/* a function to call the map with markers on it */
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }
/* a function to create the markers on the map */
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




}
google.maps.event.addDomListener(window, 'load', initMap);


/* a function to handle geolocation error */
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
