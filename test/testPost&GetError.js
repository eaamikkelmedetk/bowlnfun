/**
 * Created by Morten on 16/11/2016.
 */
var request = require('supertest');

var app = require('../app');

var validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODM1NmEzZjI5YTg1MTEyYWNiNjNlM2MiLCJjZW50ZXJJZCI6IjU4MzU2YTNmMjlhODUxMTJhY2I2M2UzYiIsInBlcm1pc3Npb25zIjoicmVhZC1hY2Nlc3MiLCJpYXQiOjE0Nzk4OTU3ODEsImV4cCI6MTQ3OTk4MjE4MX0.xlT_NlUrQcoMFJsTVFcIWjp8_imkMbr5DlAyfzrp7Kc"


suite("POST /errors", function () {

    /*-----------------------  TC1  ---------------------------------*/

    test('POST: should post an errors on /api/errors/', function (done){
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
                .post("/api/errors/")
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
            .post("/api/errors/")
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
            .post("/api/errors/")
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
            .post("/api/errors/")
            .type("form")
            .send(error)
            .expect(417, done);
    });
});

suite("GET /errors", function () {

    /*-----------------------  TC2  ---------------------------------*/

    test("GET: should list errors on /api/errors/", function() {
        request(app)
            .get('/api/errors')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
    });

    /*-----------------------  TC3  ---------------------------------*/

   test("GET: should list a SINGLE error on /api/errors/:id", function (done) {
       request(app)
           .get('/api/errors/582c58a573daae3fe40f80e2')
           .expect('Content-Type', /json/)
           .expect(200, { error: [{
               __v: 0,
               _id: "582c58a573daae3fe40f80e2",
               pins: [
                   false,
                   false,
                   false,
                   false,
                   false,
                   false,
                   false,
                   false,
                   false,
                   false
               ],
               timestamp: "2016-11-16T13:01:25.556Z",
               type: "Sensor afbrudt på banepar"
           }]
           }, done);
   });

});
