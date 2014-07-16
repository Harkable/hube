"use strict";
var app = require('../app');

module.exports.init = function(socket){

};
module.exports.update = function(type){

    //console.log("update");
    switch(type){

        case 'fb' :
            app.io.sockets.emit('badger', { animal: 'badger'});
        break;
    }
};