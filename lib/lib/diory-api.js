"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superagent = require("superagent");
var request = superagent.agent();
var DioryApi = (function () {
    function DioryApi() {
    }
    DioryApi.getAuthToken = function () {
        if (typeof this.authToken === "string") {
            return this.authToken;
        }
        else if (!this.authToken || this.authToken === "") {
            throw "Authentication token not given.";
        }
        else {
            throw "Authentication token is invalid.";
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
