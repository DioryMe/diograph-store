"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonapi_datastore_1 = require("jsonapi-datastore");
var diory_1 = require("./models/diory");
var diograph_api_1 = require("./lib/diograph-api");
var DiographStore = (function () {
    function DiographStore() {
    }
    DiographStore.setAuthToken = function (token) {
        diograph_api_1.DiographApi.authToken = token;
    };
    DiographStore.get = function (id) {
        var _this = this;
        if (id === undefined) {
            throw "No id was given for DiographStore.get()";
        }
        return diograph_api_1.DiographApi.get(id).then(function (response) {
            _this.datastore.sync(response);
            return new diory_1.Diory(_this.datastore.find("diories", id));
        });
    };
    DiographStore.getAll = function () {
        var _this = this;
        return diograph_api_1.DiographApi.getAll().then(function (response) {
            _this.datastore.sync(response);
            return _this.datastore.findAll("diories").map(function (diory) {
                return new diory_1.Diory(diory);
            });
        });
    };
    return DiographStore;
}());
DiographStore.datastore = new jsonapi_datastore_1.JsonApiDataStore();
exports.DiographStore = DiographStore;
