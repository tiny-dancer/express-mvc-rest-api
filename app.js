'use strict';

// BASE SETUP
// =============================================================================

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./api/config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Routes and the app as an express app
var app = require('./api/config/system/bootstrap')(passport, db);

// Start the app by listening on <port>
app.listen(config.port);

module.exports = app;
