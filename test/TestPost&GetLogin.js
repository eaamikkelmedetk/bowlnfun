/**
 * Created by Morten on 16/11/2016.
 */
var request = require('supertest');
var app = require('../app');


suite("GET /authenticate", function () {

    /*-----------------------  TC1  ---------------------------------*/

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

});

suite("POST /authenticate", function () {

    /*-----------------------  TC2  ---------------------------------*/

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


