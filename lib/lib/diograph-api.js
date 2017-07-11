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
    DiographApi.create = function (data, type) {
        if (data === void 0) { data = {}; }
        if (type === void 0) { type = "diories"; }
        if (type !== "diories") {
            throw "Invalid type for DiographApi.create()";
        }
        var endpoint = this.baseUrl + type;
        var jsonApiData = this.hashToJsonApi(data, type);
        return this.postToEndpoint(endpoint, jsonApiData);
    };
    DiographApi.update = function (id, data, type) {
        if (data === void 0) { data = {}; }
        if (type === void 0) { type = "diories"; }
        if (type !== "diories") {
            throw "Invalid type for DiographApi.update()";
        }
        var endpoint = this.baseUrl + type + "/" + id;
        var jsonApiData = this.hashToJsonApi(data, type, id);
        return this.putToEndpoint(endpoint, jsonApiData);
    };
    DiographApi.delete = function (id, type) {
        if (type === void 0) { type = "diories"; }
        if (type !== "diories") {
            throw "Invalid type for DiographApi.delete()";
        }
        var endpoint = this.baseUrl + type + "/" + id;
        return this.deleteToEndpoint(endpoint);
    };
    DiographApi.getFromEndpoint = function (endpoint) {
        var promise = request
            .get(endpoint)
            .set("Accept", "application/vnd.api+json")
            .set("Authorization", this.getAuthToken());
        return promise.then(function (res, err) {
            return res.body;
        }, function (err) { throw err; });
    };
    DiographApi.postToEndpoint = function (endpoint, data) {
        var promise = request
            .post(endpoint)
            .send(data)
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .set("Authorization", this.getAuthToken());
        return promise.then(function (res, err) {
            return res.body;
        }, function (err) { throw err; });
    };
    DiographApi.putToEndpoint = function (endpoint, data) {
        var promise = request
            .put(endpoint)
            .send(data)
            .set("Accept", "application/vnd.api+json")
            .set("Content-Type", "application/vnd.api+json")
            .set("Authorization", this.getAuthToken());
        return promise.then(function (res, err) {
            return res.body;
        }, function (err) { throw err; });
    };
    DiographApi.deleteToEndpoint = function (endpoint) {
        var promise = request
            .delete(endpoint)
            .set("Accept", "application/vnd.api+json")
            .set("Authorization", this.getAuthToken());
        return promise.then(function (res, err) {
            return res.status;
        }, function (err) { throw err; });
    };
    DiographApi.hashToJsonApi = function (obj, type, id) {
        if (id === void 0) { id = undefined; }
        var jsonApiData = {
            "data": {
                "type": type,
                "attributes": obj
            }
        };
        if (id) {
            jsonApiData["data"]["id"] = id;
        }
        return jsonApiData;
    };
    DiographApi.baseUrl = "http://diory-server.herokuapp.com/v1/";
    return DiographApi;
}());
exports.DiographApi = DiographApi;
