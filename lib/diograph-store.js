"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonapi_datastore_1 = require("jsonapi-datastore");
var diory_1 = require("./models/diory");
var connection_1 = require("./models/connection");
var diograph_api_1 = require("./lib/diograph-api");
// Better error message for Unhandled Promise rejections
process.on('unhandledRejection', function (reason, p) {
    console.log("Unhandled Rejection, reason: ", reason);
});
var DiographStore = (function () {
    function DiographStore() {
    }
    DiographStore.setAuthToken = function (token) {
        diograph_api_1.DiographApi.authToken = token;
        this.datastore = new jsonapi_datastore_1.JsonApiDataStore();
    };
    DiographStore.getDiory = function (id) {
        var _this = this;
        if (id === undefined) {
            throw "No id was given for DiographStore.getDiory()";
        }
        return diograph_api_1.DiographApi.get(id).then(function (response) {
            _this.datastore.sync(response);
            return new diory_1.Diory(_this.datastore.find("diories", id));
        });
    };
    DiographStore.getAllDiories = function (type) {
        var _this = this;
        if (type === void 0) { type = undefined; }
        var dioryJSONs, dioryIds;
        return diograph_api_1.DiographApi.getAll(type).then(function (response) {
            _this.datastore.sync(response);
            if (type) {
                var dioryIds_1 = response["data"].map(function (dioryJSON) { return dioryJSON["id"]; });
                dioryJSONs = _this.datastore.findAll("diories").filter(function (dioryData) {
                    return dioryIds_1.includes(dioryData.id);
                });
            }
            else {
                dioryJSONs = _this.datastore.findAll("diories");
            }
            return dioryJSONs.map(function (diory) {
                return new diory_1.Diory(diory);
            });
        });
    };
    DiographStore.createDiory = function (obj) {
        var _this = this;
        if (!(obj instanceof Object)) {
            throw "Data given for DiographStore.createDiory() wasn't an object";
        }
        return diograph_api_1.DiographApi.create(obj).then(function (response) {
            _this.datastore.sync(response);
            return new diory_1.Diory(_this.datastore.find("diories", response.data.id));
        });
    };
    DiographStore.connectDiories = function (fromDioryId, toDioryId) {
        var _this = this;
        if (fromDioryId === undefined || toDioryId === undefined) {
            throw "DiographStore.connectDiories() requires two parameters";
        }
        var fromDiory, toDiory;
        var fromDioryPromise = this.getDiory(fromDioryId).then(function (diory) {
            fromDiory = diory;
        });
        var toDioryPromise = this.getDiory(toDioryId).then(function (diory) {
            toDiory = diory;
        });
        return Promise.all([fromDioryPromise, toDioryPromise]).then(function () {
            var requestObject = {
                "from-diory-id": fromDiory.id,
                "to-diory-id": toDiory.id
            };
            return diograph_api_1.DiographApi.create(requestObject, "connections").then(function (response) {
                _this.datastore.sync(response);
                return {
                    fromDiory: fromDiory,
                    toDiory: toDiory,
                    connection: new connection_1.Connection(_this.datastore.find("connections", response.data.id))
                };
            });
        });
    };
    DiographStore.createAndConnectDiory = function (obj, fromDioryId) {
        var _this = this;
        if (!(obj instanceof Object)) {
            throw "Data given for DiographStore.createAndConnectDiory() wasn't an object";
        }
        if (fromDioryId === undefined) {
            throw "DiographStore.createAndConnectDiory() requires two parameters";
        }
        return this.createDiory(obj).then(function (createdDiory) {
            return _this.connectDiories(fromDioryId, createdDiory.id).then(function (connectionObject) {
                return connectionObject;
            });
        });
    };
    DiographStore.datastore = new jsonapi_datastore_1.JsonApiDataStore();
    return DiographStore;
}());
exports.DiographStore = DiographStore;
