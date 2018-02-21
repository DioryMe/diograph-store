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
var DiographStore = /** @class */ (function () {
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
            return new diory_1.Diory(_this.datastore.find("diories", response.data.id));
        }).catch(function (err) {
            if (err.status === 404) {
                return null;
            }
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
        var requestObj = this.convertResponseObjectToRequestObject(obj);
        return diograph_api_1.DiographApi.create(requestObj).then(function (response) {
            _this.datastore.sync(response);
            return new diory_1.Diory(_this.datastore.find("diories", response.data.id));
        });
    };
    DiographStore.updateDiory = function (id, obj) {
        var _this = this;
        if (id === undefined) {
            throw "No id was given for DiographStore.updateDiory()";
        }
        if (!(obj instanceof Object)) {
            throw "Data given for DiographStore.updateDiory() wasn't an object";
        }
        var requestObj = this.convertResponseObjectToRequestObject(obj);
        return diograph_api_1.DiographApi.update(id, requestObj).then(function (response) {
            _this.datastore.sync(response);
            return new diory_1.Diory(_this.datastore.find("diories", response.data.id));
        });
    };
    DiographStore.deleteDiory = function (id) {
        var _this = this;
        return diograph_api_1.DiographApi.delete(id).then(function (response) {
            var dioryDatastoreModel = _this.datastore.find("diories", id);
            _this.datastore.destroy(dioryDatastoreModel);
            return null;
        });
    };
    DiographStore.getConnection = function (fromDioryId, toDioryId) {
        var _this = this;
        if (fromDioryId === undefined || toDioryId === undefined) {
            throw "Required two ids not given to DiographStore.getConnection()";
        }
        return diograph_api_1.DiographApi.get([fromDioryId, toDioryId], "connections").then(function (response) {
            _this.datastore.sync(response);
            if (response.data.length > 0) {
                return new connection_1.Connection(_this.datastore.find("connections", response.data[0].id));
            }
            else {
                return null;
            }
        });
    };
    DiographStore.deleteConnection = function (fromDioryId, toDioryId) {
        if (fromDioryId === undefined || toDioryId === undefined) {
            throw "Required two ids not given to DiographStore.deleteConnection()";
        }
        return this.getConnection(fromDioryId, toDioryId).then(function (connection) {
            if (connection === null) {
                return null;
            }
            else {
                return diograph_api_1.DiographApi.delete(connection.id, "connections").then(function (response) {
                    // let connectionDatastoreModel = this.datastore.find("connections", connection.id)
                    // this.datastore.destroy(connectionDatastoreModel)
                    return null;
                });
            }
        });
    };
    DiographStore.deleteStrongConnection = function (fromDioryId, toDioryId) {
        if (fromDioryId === undefined || toDioryId === undefined) {
            throw "Required two ids not given to DiographStore.deleteStrongConnection()";
        }
        var fromToPromise = this.deleteConnection(fromDioryId, toDioryId);
        var toFromPromise = this.deleteConnection(toDioryId, fromDioryId);
        return Promise.all([fromToPromise, toFromPromise]).then(function () {
            return null;
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
    DiographStore.createAndConnectDioryStrongly = function (obj, fromDioryId) {
        var _this = this;
        return this.createAndConnectDiory(obj, fromDioryId).then(function (connectionObject) {
            return _this.connectDiories(connectionObject.toDiory.id, connectionObject.fromDiory.id).then(function (updatedConnectionObject) {
                connectionObject.fromDiory = updatedConnectionObject.toDiory;
                connectionObject.toDiory = updatedConnectionObject.fromDiory;
                return connectionObject;
            });
        });
    };
    // Private
    DiographStore.convertResponseObjectToRequestObject = function (obj) {
        delete obj["connectedDiories"];
        delete obj["id"];
        if (obj["type"]) {
            obj["diory-type"] = obj["type"];
            delete obj["type"];
        }
        if (obj["url"]) {
            obj["address"] = obj["url"];
            delete obj["url"];
        }
        if (obj["geo"] != undefined) {
            obj["latitude"] = obj["geo"]["latitude"];
            obj["longitude"] = obj["geo"]["longitude"];
            delete obj["geo"];
        }
        return obj;
    };
    DiographStore.datastore = new jsonapi_datastore_1.JsonApiDataStore();
    return DiographStore;
}());
exports.DiographStore = DiographStore;
