/**
 * Created by Morten on 24/11/2016.
 */

var request = require('supertest');
var config = require('../config');
var app = require('../app');

var validToken = config.testToken;

suite("GET /errors", function () {

    /*-----------------------  TC1  ---------------------------------*/

    test("GET: should list errors on /api/errors/", function() {
        request(app)
            .get('/center/api/errors')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
    });

});
