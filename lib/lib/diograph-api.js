"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("superagent");
var DiographApi = /** @class */ (function () {
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
    // private static baseUrl = localStorage.getItem("endpoint")
    DiographApi.get = function (id, type) {
        if (type === void 0) { type = "diories"; }
        if (type !== "diories" && type !== "connections") {
            throw "Invalid type for DiographApi.get()";
        }
        if (id === undefined) {
            throw "No id was given for DiographApi.get()";
        }
        var endpoint = this.baseUrl + type + "/" + id;
        var query = {};
        if (type == "connections") {
            if (!(id instanceof Array)) {
                throw "Id should be an array in DiographApi.get('connections')";
            }
            endpoint = this.baseUrl + type + "/";
            query = { filter: { "from-diory-id": id[0], "to-diory-id": id[1] } };
        }
        return this.getFromEndpoint(endpoint, query);
    };
    DiographApi.getAll = function (type) {
        if (type === void 0) { type = undefined; }
        if (type && ["place", "check-in"].indexOf(type) < 0) {
            throw "Invalid type for DiographApi.getAll()";
        }
        var endpoint = this.baseUrl + "diories";
        var query = type ? { filter: { diory_type: type }, include: "connected-diories,connections" } : undefined;
        return this.getFromEndpoint(endpoint, query);
    };
    DiographApi.create = function (data, type) {
        if (data === void 0) { data = {}; }
        if (type === void 0) { type = "diories"; }
        if (!(data instanceof Object)) {
            throw "Data given for DiographApi.create() wasn't an object";
        }
        if (type !== "diories" && type !== "connections") {
            throw "Invalid type for DiographApi.create()";
        }
        var endpoint = this.baseUrl + type;
        var jsonApiData = this.hashToJsonApi(data, type);
        return this.postToEndpoint(endpoint, jsonApiData);
    };
    DiographApi.update = function (id, data, type) {
        if (data === void 0) { data = {}; }
        if (type === void 0) { type = "diories"; }
        if (id === undefined) {
            throw "No id was given for DiographApi.update()";
        }
        if (!(data instanceof Object)) {
            throw "Data given for DiographApi.update() wasn't an object";
        }
        if (type !== "diories") {
            throw "Invalid type for DiographApi.update()";
        }
        var endpoint = this.baseUrl + type + "/" + id;
        var jsonApiData = this.hashToJsonApi(data, type, id);
        return this.putToEndpoint(endpoint, jsonApiData);
    };
    DiographApi.delete = function (id, type) {
        if (type === void 0) { type = "diories"; }
        if (id === undefined) {
            throw "No id was given for DiographApi.delete()";
        }
        if (type !== "diories" && type !== "connections") {
            throw "Invalid type for DiographApi.delete()";
        }
        var endpoint = this.baseUrl + type + "/" + id;
        return this.deleteToEndpoint(endpoint);
    };
    DiographApi.getUploadUrls = function () {
        return this.getFromEndpoint("http://localhost:3000/v1/presigned-upload-url").then(function (response) {
            return response.data;
        });
    };
    DiographApi.getFromEndpoint = function (endpoint, query) {
        if (query === void 0) { query = {}; }
        var promise = request
            .get(endpoint)
            .query(query)
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
            return res.body;
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
    // private static baseUrl = "http://diory-server.herokuapp.com/v1/";
    DiographApi.baseUrl = "http://localhost:3000/v1/";
    return DiographApi;
}());
exports.DiographApi = DiographApi;
