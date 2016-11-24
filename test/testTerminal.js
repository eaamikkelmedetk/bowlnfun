/**
 * Created by Morten on 16/11/2016.
 */
var request = require('supertest');
var route = '/terminal/api/errors'
var app = require('../app');

var validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODM1ODU0NmY3YzE5NWFhNTVjYTY0YmIiLCJwZXJtaXNzaW9ucyI6InJlYWQtYWNjZXNzLHdyaXRlLWFjY2VzcyxhZG1pbiIsImlhdCI6MTQ3OTk4MjUyOCwiZXhwIjoxNDgwMDY4OTI4fQ._0Ldod7qhMO1xFSNGI0osSKxHIF5uMdfJyQ9Mjerjyc";

suite("POST /errors", function () {

    /*-----------------------  TC1  ---------------------------------*/

    test('POST: should post an error on /api/errors/', function (done){
            var error = {
                __v: 0,
                _id: "582c58a573daae3fe40f80e2",
                pins: JSON.stringify([]),
                timestamp: "2016-11-16T13:01:25.556Z",
                machineId: '582cae310ce9f313d7e26d9a',
                type: "Sensor afbrudt på banepar",
                token: validToken
            };
            request(app)
                .post(route)
                .type("form")
                .send(error)
                .expect(200)
                .expect({
                    message: "The error has been added to the registry"
                }, done);
    });

    /*-----------------------  TC4  ---------------------------------*/

    test("POST: pins MUST be a stringified array", function (done) {
        var error = {
            pins: 5,
            type: "TC4",
            machineId: '582cae310ce9f313d7e26d9a',
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(error)
            .expect(417, done);
    });

    /*-----------------------  TC5  ---------------------------------*/

    test("POST: type must be defined", function(done) {
        var error = {
            pins: JSON.stringify([1,4]),
            machineId: '582cae310ce9f313d7e26d9a',
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(error)
            .expect(417, done);
    });

    /*-----------------------  TC6  ---------------------------------*/

    test("POST: machineId must be defined", function(done) {
        var error = {
            pins: JSON.stringify([]),
            type: "TC6",
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(error)
            .expect(417, done);
    });
});