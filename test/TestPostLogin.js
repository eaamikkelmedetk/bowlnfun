/**
 * Created by Morten on 16/11/2016.
 */
var request = require('supertest');
var app = require('../app');


suite("POST /errors", function () {

    /*-----------------------  TC1  ---------------------------------*/

    // test('POST: should post an errors on /api/errors/', function (done){
    //     var error = {
    //         __v: 0,
    //         _id: "582c58a573daae3fe40f80e2",
    //         pins: JSON.stringify([]),
    //         timestamp: "2016-11-16T13:01:25.556Z",
    //         machineId: '582cae310ce9f313d7e26d9a',
    //         type: "Sensor afbrudt på banepar"
    //     };
    //     request(app)
    //         .post("/api/errors/")
    //         .type("form")
    //         .send(error)
    //         .expect(200)
    //         .expect({
    //             message: "The error has been added to the registry"
    //         }, done);
    // });

    test('GET /authenticate', function(done){
        request(app)
            .get('/authenticate')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                console.log(res.body);
                return done();
            }, done);
    });

    test('POST /authenticate', function(done) {
        request(app)
            .post('/authenticate')
            .send({ name: "root", password: "gummiand" })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    });

});


