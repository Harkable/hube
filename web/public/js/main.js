$(function () {
    'use strict';

    var s,
        app = {

        settings : {
            a: 'b'
        },
        init : function(){
            s = this.settings;

            this.bindUiActions();
            this.socketConnect();
            this.socketEvents();
        },

        bindUiActions : function () {
            var self = this;
        },

        socketConnect : function(){
            this.socket = io.connect();
        },

        socketEvents : function() {
            var self = this;

            this.socket.on('event-name', function(data){
                console.log(data);
            });
        }
    };

    app.init();
});