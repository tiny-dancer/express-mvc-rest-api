'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Company = mongoose.model('Company'),
    _ = require('lodash');

/**
 * List all companies
 */
exports.list = function(req, res) {
    Company.find(function(err, companies) {
        if (err)
            res.send(err);

        res.json(companies);
    });
};

/**
 * Create a company
 */
exports.create = function(req, res) {

    var company = new Company(req.body.company);

    // save the company and check for errors
    company.save(function(err) {
        if (err) res.send(err);

        res.jsonp(company);
    });
};

/**
 * Get company by _id
 */
exports.findById = function(req, res) {
    Company.findById(req.params.companyId, function(err, company) {
        if (err)
            res.send(err);
        res.jsonp(company);
    });
};

/**
 * Update company
 */
exports.update = function(req, res) {
    // use our bear model to find the bear we want
    Company.findById(req.params.companyId, function(err, company) {

        if (err)
            res.send(err);

        // update the company's info
        _.merge(company,req.body.company);
        company.modifiedOn = new Date();

        // save the bear
        company.save(function(err) {
            if (err) res.send(err);

            res.jsonp(company);
        });
    });
};

/*
 * Terminate the company
 *  - Instead of removing company from DB, set terminatedOn date
 *    therefore 'de-activating' the company
 */
exports.terminate = function(req, res) {
    req.body.company = {
        terminatedOn: new Date()
    };
    exports.update(req, res);
};
/*
 * Delete the company
 *  - CANNOT delete a company if it has related data (do i like this logic?)
 */
exports.delete = function(req, res) {
    Company.remove({
        _id: req.params.companyId
    }, function(err, company) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully terminated' });
    });
};