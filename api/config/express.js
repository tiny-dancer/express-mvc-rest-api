'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    config = require('./config'),
    appPath = process.cwd(),
    fs = require('fs'),
    bodyParser = require('body-parser');

module.exports = function(app, passport, db) {

    app.use(bodyParser());
    // Enable jsonp
    //app.enable('jsonp callback');

    // Use passport session
    // app.use(passport.initialize());
    // app.use(passport.session());

    // Routes should be at the last
    function bootstrapRoutes() {
        var routes_path = appPath + '/api/routes';
        var walk = function(path) {
            fs.readdirSync(path).forEach(function(file) {
                var newPath = path + '/' + file;
                var stat = fs.statSync(newPath);
                if (stat.isFile()) {
                    if (/(.*)\.(js$|coffee$)/.test(file)) {
                        //require(newPath)(app, passport);
                        app.use('/', require(newPath));
                    }
                    // We skip the app/routes/middlewares directory as it is meant to be
                    // used and shared by routes as further middlewares and is not a
                    // route by itself
                } else if (stat.isDirectory() && file !== 'middlewares') {
                    walk(newPath);
                }
            });
        };
        walk(routes_path);
    }
    bootstrapRoutes();

};