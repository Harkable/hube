"use strict";
var config = require('../config'),
    FB = require('fb'),
    socialController = require("./socialController");

module.exports.init = function(socket){
    socialController.fbStream();
    socialController.twitterStream();
};

module.exports.fbStream = function(socket){

    setInterval( function() {

        FB.api('/harkable', function (res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            console.log(res.likes);
        });

    }, 5000);

};

module.exports.twitterStream = function(socket){

};