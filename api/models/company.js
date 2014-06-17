'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Company Schema
 */
var CompanySchema = new Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    },
    terminatedOn: {
        type: Date
    },
    name: {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('Company', CompanySchema);
