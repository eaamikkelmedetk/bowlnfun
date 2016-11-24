/**
 * Created by Marcus on 21-11-2016.
 */

var request = require('supertest');
var app = require('../app');
var route = "/admin/api/centers/";
var Center = "../models/center";

var validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODM1ODU0NmY3YzE5NWFhNTVjYTY0YmIiLCJwZXJtaXNzaW9ucyI6InJlYWQtYWNjZXNzLHdyaXRlLWFjY2VzcyxhZG1pbiIsImlhdCI6MTQ3OTk4MjUyOCwiZXhwIjoxNDgwMDY4OTI4fQ._0Ldod7qhMO1xFSNGI0osSKxHIF5uMdfJyQ9Mjerjyc";
suite('POST /admin/centers', function () {

    /*------------------------------- TC7 -----------------------------------*/

    test("POST: should add a new center to DB", function (done) {
        var center = {
            name: "testCenterTC7",
            readName: "testCenterReadTC7",
            writeName: "testCenterWriteTC7",
            readPass: "testCenterReadPassTC7",
            writePass: "testCenterWritePassTC7",
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(center)
            .expect(200, done);
    });

    /*------------------------------- TC8 -----------------------------------*/

    test("POST: name MUST be defined", function (done) {
        var center = {
            readName: "testCenterReadTC8",
            writeName: "testCenterWriteTC8",
            readPass: "testCenterReadPassTC8",
            writePass: "testCenterWritePassTC8",
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(center)
            .expect(417, done);
    });

    /*------------------------------- TC9 -----------------------------------*/

    test("POST: readName MUST be defined", function (done) {
        var center = {
            name: "testCenterTC9",
            writeName: "testCenterWriteTC9",
            readPass: "testCenterReadPassTC9",
            writePass: "testCenterWritePassTC9",
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(center)
            .expect(417, done);
    });

    /*------------------------------- TC10 -----------------------------------*/

    test("POST: writeName MUST be defined", function (done) {
        var center = {
            name: "testCenterTC10",
            readName: "testCenterReadTC10",
            readPass: "testCenterReadPassTC10",
            writePass: "testCenterWritePassTC10",
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(center)
            .expect(417, done);
    });

    /*------------------------------- TC11 -----------------------------------*/

    test("POST: readPass MUST be defined", function (done) {
        var center = {
            name: "testCenterTC11",
            readName: "testCenterReadTC11",
            writeName: "testCenterWriteTC11",
            writePass: "testCenterWritePassTC11",
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(center)
            .expect(417, done);
    });

    /*------------------------------- TC12 -----------------------------------*/

    test("POST: writePass MUST be defined", function (done) {
        var center = {
            name: "testCenterTC12",
            readName: "testCenterReadTC12",
            writeName: "testCenterWriteTC12",
            readPass: "testCenterReadPassTC12",
            token: validToken
        };
        request(app)
            .post(route)
            .type("form")
            .send(center)
            .expect(417, done);
    });
});

// suite('PUT /admin/centers', function() {
//     test("DELETE: should deactivate a 'center' and associated 'users' from DB", function(done){
//         var tC7CenterId;
//
//         Center.findOne({name: "testCenterTC7"}, function(err, center){
//             tC7CenterId = center._id;
//         });
//         var center = {
//             id: tC7CenterId
//         };
//         request(app)
//             .put(route)
//             .type("form")
//             .send(center)
//             .expect(200, done);
//     })
// })
