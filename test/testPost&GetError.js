/**
 * Created by Morten on 16/11/2016.
 */
var request = require('supertest');

var app = require('../app');

suite("POST /errors", function () {

    /*-----------------------  TC1  ---------------------------------*/

    test('POST: should post an errors on /api/errors/', function (done){
            var error = {
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
                type: "Test"
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
});

suite("GET /errrors", function () {

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
               type: "Test"
           }]
           }, done);
   })
});