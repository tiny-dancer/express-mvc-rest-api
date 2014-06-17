'use strict';

var express = require('express'),
    router = express.Router(),
    companies = require('../controllers/companies'),
    mongoose = require('mongoose'),
    Company = mongoose.model('Company'),
    _ = require('lodash');

// middleware to use for all requests
router.use(function(req, res, next) {
    // the most BASIC logger :)
    console.log('%s %s', req.method, req.url);
    next();
});

/**
 * /companies
 */
router.route('/companies')
    .post(companies.create)
    .get(companies.list);

/**
 * /companies/:companyId
 */
router.route('/companies/:companyId')
    .get(companies.findById)
    .put(companies.update)
    .delete(companies.terminate);


module.exports = router;

