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
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function initialize() {
    var mapProp = {
        center:new google.maps.LatLng(57.148080, -2.094816),
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map"), mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);




















$(document).ready(function(){
    $('.fb-share-button').click(function(d){
        d.preventDefault();
        FB.ui(
            {
                name: 'AAAAAAAAAAAAAAAA',
                link: 'http://google.com',
                picture: 'http://group-o.azurewebsites.net/cheers_logo.png’',
                caption: 'Top 3 reasons why you should care about your finance',
                description: "Q SE SHIBAI BE SIME ",
                message: ' EBASI MAIKATAAAAAA',
            });
    });
});


