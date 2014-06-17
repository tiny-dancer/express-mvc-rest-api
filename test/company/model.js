'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Company = mongoose.model('Company');

//Globals
var personOwner,
    company,
    companyName = 'Test company';

//The tests
describe('<Unit Test>', function() {
    describe('Model Company:', function() {
        beforeEach(function(done) {
//            personOwner = new Person({
//                firstName: 'First name',
//                lastName: 'Last name',
//                email: 'test@test.com'
//            });

            company = new Company({
                name: 'Test company'
                //people: [personOwner]
            });

            done();
        });

        describe('Method Save', function() {
            it('should begin without the test company', function(done) {
                Company.find({ name: companyName }, function(err, companies) {
                    companies.should.have.length(0);
                    done();
                });
            });
            it('should be able to save without problems', function(done) {
                return company.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
            it('should be able to show an error when try to save with a duplicate name', function(done) {
                company.save(function(err) {
                    should.not.exist(err);

                    company.save(function(err) {
                        Company.find({ name: companyName }, function(err, companies) {
                            companies.should.have.length(1);
                            done();
                        });
                    });
                });


            });
            it('should be able to show an error when try to save without a name', function(done) {
                company.name = '';
                return company.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

        });

        afterEach(function(done) {
            //personOwner.remove();
            company.remove();
            done();
        });
    });
});