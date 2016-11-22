/**
 * Created by Marcus on 21-11-2016.
 */

var request = require('supertest');
var app = require('../app');
var route = "/admin/centers/";

suite('POST /admin/centers', function () {

    /*------------------------------- TC7 -----------------------------------*/

    test("POST: should add a new center to DB", function (done) {
        var center = {
            name: "testCenterTC7",
            readName: "testCenterReadTC7",
            writeName: "testCenterWriteTC7",
            readPass: "testCenterReadPassTC7",
            writePass: "testCenterWritePassTC7"
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
            writePass: "testCenterWritePassTC8"
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
            writePass: "testCenterWritePassTC9"
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
            writePass: "testCenterWritePassTC10"
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
            writePass: "testCenterWritePassTC11"
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
            readPass: "testCenterReadPassTC12"
        };
        request(app)
            .post(route)
            .type("form")
            .send(center)
            .expect(417, done);
    });
});