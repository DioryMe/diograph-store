"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var diograph_store_1 = require("../app/diograph-store");
var diory_1 = require("../app/models/diory");
describe("Diory store", function () {
    beforeEach(function () {
        diograph_store_1.DiographStore.setAuthToken("test-token");
    });
    it("returns Diory when success", function (done) {
        diograph_store_1.DiographStore.get("5691").then(function (diory) {
            expect(diory).toEqual(jasmine.any(diory_1.Diory));
            expect(diory.id).toBe("5691");
            done();
        });
    });
    it("returns 404 - Not found when error", function (done) {
        diograph_store_1.DiographStore.get("invalid id").catch(function (err) {
            expect(err.errors[0].title).toBe("Diory not found");
            done();
        });
    });
});
