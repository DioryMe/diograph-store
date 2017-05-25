"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var diory_api_1 = require("../app/lib/diory-api");
describe("Diory api", function () {
    beforeEach(function () {
        diory_api_1.DioryApi.authToken = "test-token";
    });
    it("returns diories", function (done) {
        diory_api_1.DioryApi.get("5691", "diories").then(function (res) {
            expect(res.data.type).toEqual("diories");
            expect(res.data.id).toEqual("5691");
            done();
        });
    });
    it("returns connections", function (done) {
        diory_api_1.DioryApi.get("9982", "connections").then(function (res) {
            expect(res.data.type).toEqual("connections");
            expect(res.data.id).toEqual("9982");
            done();
        });
    });
    it("returns error", function (done) {
        diory_api_1.DioryApi.get("invalid id", "connections").catch(function (err) {
            expect(err.errors[0].status).toBe("400");
            done();
        });
    });
    it("returns another error", function (done) {
        diory_api_1.DioryApi.get("99999999", "connections").catch(function (err) {
            expect(err.errors[0].status).toBe("404");
            done();
        });
    });
    it("throws 'Authentication token not given' if no authToken given", function (done) {
        diory_api_1.DioryApi.authToken = undefined;
        try {
            diory_api_1.DioryApi.get("5690", "diories");
        }
        catch (err) {
            expect(err).toBe("Authentication token not given");
            done();
        }
    });
});
