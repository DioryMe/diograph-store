"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonapi_datastore_1 = require("jsonapi-datastore");
var diory_1 = require("./models/diory");
var connection_1 = require("./models/connection");
var diograph_api_1 = require("./lib/diograph-api");
var exif_js_1 = require("exif-js");
var request = require("superagent");
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
    DiographStore.createDioryFromImageFile = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var file, background, exif, dioryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = event.target.files[0];
                        console.log(file);
                        // Get uploadUrl from diory-server
                        return [4 /*yield*/, diograph_api_1.DiographApi.getUploadUrls().then(function (uploadUrls) {
                                console.log(uploadUrls["upload-url"]);
                                // Upload the file to S3 via PUT request to uploadUrl
                                return request.put(uploadUrls["upload-url"]).send(file).then(function (response) {
                                    // Return S3 url
                                    console.log(uploadUrls["public-url"]);
                                    return uploadUrls["public-urls"];
                                });
                            })
                            // 2. Date, latitude & longitude are extracted from EXIF
                        ];
                    case 1:
                        background = 
                        // Get uploadUrl from diory-server
                        _a.sent();
                        return [4 /*yield*/, this.extractEXIFData(file)];
                    case 2:
                        exif = _a.sent();
                        console.log(exif);
                        dioryData = {
                            name: file.name,
                            type: "image",
                            background: background,
                            date: exif["date"],
                            latitude: exif["latitude"],
                            longitude: exif["longitude"]
                        };
                        console.log(dioryData);
                        // 4. Create diory and return it
                        return [2 /*return*/, this.createDiory(dioryData).then(function (diory) {
                                return diory;
                            })];
                }
            });
        });
    };
    DiographStore.extractEXIFData = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var exif;
            return __generator(this, function (_a) {
                exif = {};
                return [2 /*return*/, exif_js_1.EXIF.getData(file, function () {
                        exif["date"] = this.toGpsDecimal(exif_js_1.EXIF.getTag(this, "DateTimeOriginal"));
                        exif["latitude"] = this.toGpsDecimal(exif_js_1.EXIF.getTag(this, "GPSLatitude"));
                        exif["longitude"] = this.toGpsDecimal(exif_js_1.EXIF.getTag(this, "GPSLongitude"));
                        return exif;
                    })];
            });
        });
    };
    DiographStore.toGpsDecimal = function (number) {
        return number[0].numerator + number[1].numerator /
            (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    };
    ;
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
