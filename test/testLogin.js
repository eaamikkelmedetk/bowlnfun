/**
 * Created by Morten on 16/11/2016.
 */
var request = require('supertest');
var app = require('../app');


suite("GET /login", function () {

    /*-----------------------  TC1  ---------------------------------*/

    test('GET: Should open site on /login', function(done){
        request(app)
            .get('/login')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                console.log(res.body);
                return done();
            }, done);
    });

});

suite("POST /login", function () {

    /*-----------------------  TC2  ---------------------------------*/

    test('POST: /login', function(done) {
        request(app)
            .post('/login/authenticate')
            .send({ name: "root", password: "gummiand" })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    });

});


