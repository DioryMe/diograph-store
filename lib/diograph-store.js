"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonapi_datastore_1 = require("jsonapi-datastore");
var diory_1 = require("./models/diory");
var diory_api_1 = require("./lib/diory-api");
var DiographStore = (function () {
    function DiographStore() {
    }
    DiographStore.setAuthToken = function (token) {
        diory_api_1.DioryApi.authToken = token;
    };
    DiographStore.get = function (id) {
        var _this = this;
        return diory_api_1.DioryApi.get(id).then(function (response) {
            _this.datastore.sync(response);
            return new diory_1.Diory(_this.datastore.find("diories", id));
        });
    };
    return DiographStore;
}());
DiographStore.datastore = new jsonapi_datastore_1.JsonApiDataStore();
exports.DiographStore = DiographStore;
