/**
 * Created by Morten on 16/11/2016.
 */
var request = require('supertest');

var app = require('../app');

suite("POST /errors", function () {
    test('POST: should post an errors on /errors/', function (done){
            var error = {
                _id: "582c53e3b447b81268b0e743",
                type: "Sensor afbrudt på banepar",
                machineId: "1",
                timestamp: "2016-11-16T12:41:07.082Z",
                __v: 0,
                pins: []
            };
            request(app)
                .post("/api/errors")
                .type("form")
                .send(error)
                .expect(200)
                .expect({
                    message: "The error has been added to the registry"
                }, done);
    });
});

suite("GET /errrors", function () {
    test("GET: should list errors on /errors/", function() {
        request(app)
            .get('/api/errors')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
    });

   test("GET: should list a SINGLE error on /errors/:id", function (done) {
       request(app)
           .get('/api/errors/582c53e3b447b81268b0e743')
           .expect('Content-Type', /json/)
           .expect(200, { error: [{
               _id: "582c53e3b447b81268b0e743",
               type: "Sensor afbrudt på banepar",
               machineId: "1",
               timestamp: "2016-11-16T12:41:07.082Z",
               __v: 0,
               pins: []
           }]
           }, done);
   })
});