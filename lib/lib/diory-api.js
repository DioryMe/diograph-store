"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superagent = require("superagent");
var request = superagent.agent();
var DioryApi = (function () {
    function DioryApi() {
    }
    DioryApi.getAuthToken = function () {
        var authToken;
        try {
            var diographAuth = require("diograph-authentication");
            authToken = diographAuth.token;
        }
        catch (e) {
            authToken = this.authToken;
        }
        if (typeof authToken === "string" && authToken !== "") {
            return authToken;
        }
        else {
            throw "Authentication token not given";
        }
    };
    DioryApi.get = function (id, type) {
        if (type === void 0) { type = "diories"; }
        type = type + "/";
        var promise = request
            .get(this.baseUrl + type + id)
            .set("Accept", "application/vnd.api+json")
            .set("Authorization", this.getAuthToken());
        return promise.then(function (res, err) {
            return res.body;
        }).catch(function (err) {
            throw err.response.body;
        });
    };
    return DioryApi;
}());
DioryApi.baseUrl = "http://diory-server.herokuapp.com/v1/";
exports.DioryApi = DioryApi;
