'use strict';

var fs = require('fs'),
    express = require('express'),
    appPath = process.cwd();

module.exports = function(passport, db) {

    function bootstrapModels() {
        var models_path = appPath + '/api/models';
        var walk = function(path) {
            fs.readdirSync(path).forEach(function(file) {
                var newPath = path + '/' + file;
                var stat = fs.statSync(newPath);
                if (stat.isFile()) {
                    if (/(.*)\.(js$|coffee$)/.test(file)) {
                        require(newPath);
                    }
                } else if (stat.isDirectory()) {
                    walk(newPath);
                }
            });
        };
        walk(models_path);
    }

    bootstrapModels();

    // Bootstrap passport config
    //require(appPath + '/api/config/passport')(passport);

//    function bootstrapDependencies() {
//        // Register passport dependency
//        mean.register('passport', function() {
//            return passport;
//        });
//
//        // Register auth dependency
//        mean.register('auth', function() {
//            return require(appPath + '/api/routes/middlewares/authorization');
//        });
//
//        // Register database dependency
//        mean.register('database', {
//            connection: db
//        });
//
//        // Register app dependency
//        mean.register('app', function() {
//            return app;
//        });
//    }
//
//    bootstrapDependencies();

    // Express settings
    var app = express();
    require(appPath + '/api/config/express')(app, passport, db);

    return app;
};
