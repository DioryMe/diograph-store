"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("superagent");
var DiographApi = (function () {
    function DiographApi() {
    }
    DiographApi.getAuthToken = function () {
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
    DiographApi.get = function (id, type) {
        if (type === void 0) { type = "diories"; }
        if (type !== "diories" && type !== "connections") {
            throw "Invalid type for DiographApi.get()";
        }
        if (id === undefined) {
            throw "No id was given for DiographApi.get()";
        }
        var endpoint = this.baseUrl + type + "/" + id;
        return this.getFromEndpoint(endpoint);
    };
    DiographApi.getAll = function (type) {
        if (type === void 0) { type = "diories"; }
        if (type !== "diories") {
            throw "Invalid type for DiographApi.getAll()";
        }
        var endpoint = this.baseUrl + type;
        return this.getFromEndpoint(endpoint);
    };
    DiographApi.getFromEndpoint = function (endpoint) {
        var promise = request
            .get(endpoint)
            .set("Accept", "application/vnd.api+json")
            .set("Authorization", this.getAuthToken());
        return promise.then(function (res, err) {
            return res.body;
        }).catch(function (err) {
            throw err.response.body;
        });
    };
    return DiographApi;
}());
DiographApi.baseUrl = "http://diory-server.herokuapp.com/v1/";
exports.DiographApi = DiographApi;
