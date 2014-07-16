"use strict";
var express = require('express'),
    morgan = require('morgan'),
    jade = require('jade'),
    http = require('http'),
    twitter = require('twitter'),
    config = require('./config'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

//modules
var routes = require('./routes'),
    socketsController = require("./controllers/socketsController"),
    socialController = require("./controllers/socialController");

var env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.locals.env = env;
    next();
});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
routes.init(app);

io.sockets.on('connection', socketsController.init);

module.exports.io = io;

// twitter

var twit = new twitter({
    consumer_key: config.credentials.twitter.consumer_key,
    consumer_secret: config.credentials.twitter.consumer_secret,
    access_token_key: config.credentials.twitter.access_token_key,
    access_token_secret: config.credentials.twitter.access_token_secret
});

twit.stream('statuses/filter', {
    track: 'harkable'
}, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet);
    });
});

socialController.init();

module.exports.io = io;