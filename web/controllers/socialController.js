"use strict";
var config = require('../config'),
    FB = require('fb'),
    dribbbleApi = require('dribbble-api'),
    dribbble = new dribbbleApi();

//includes
var socialController = require("./socialController"),
streamSettings = {
    streamInterval: 5000,
    fbAccessToken: ''
};


module.exports.init = function(){
    //socialController.twitterStream();

    FB.api('oauth/access_token', {
        client_id: config.credentials.facebook.clientId,
        client_secret: config.credentials.facebook.clientSecret,
        grant_type: 'client_credentials'
        }, function (res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }

            streamSettings.fbAccessToken = res.access_token;
            socialController.startStream();
    });
};

module.exports.startStream = function(){

    setInterval( function() {

        socialController.fbCall();
        socialController.dribbbleCall();

    }, streamSettings.streamInterval);
};

module.exports.fbCall = function(){

    FB.setAccessToken(streamSettings.fbAccessToken);

    FB.api('harkable', { fields: ['likes'], access_token: streamSettings.fbAccessToken }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log(res.likes);
        //console.log(res.likes);
    });
};

module.exports.dribbbleCall = function(){

    var totalLikes = 0;

    dribbble.playerShots('harkable', function(err, res, json, paging) {

        json.shots.forEach(function(element, index){

            totalLikes +=element.likes_count
            //last item
            if(index === json.shots.length -1) {
                console.log(totalLikes);
            };
        });

    });
};

module.exports.twitterStream = function(){

};