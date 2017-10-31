"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Diory = /** @class */ (function () {
    function Diory(data, addConnectedDiories) {
        if (addConnectedDiories === void 0) { addConnectedDiories = true; }
        this.connectedDiories = [];
        // If attribute is null, change it to undefined
        for (var attrname in data) {
            if (data[attrname] == null) {
                data[attrname] = undefined;
            }
        }
        for (var attrname in data.geo) {
            if (data.geo[attrname] == null) {
                data.geo[attrname] = undefined;
            }
        }
        if (data === undefined) {
            data = {};
        }
        ;
        this.id = data.id;
        this.name = data.name;
        this.url = data.address;
        this.type = data["diory-type"];
        this.background = data.background;
        this.date = data.date;
        this.geo = data.geo;
        if (data["connected-diories"] && addConnectedDiories) {
            this.addConnectedDiories(data);
        }
    }
    Diory.prototype.addConnectedDiories = function (dioryData) {
        var _this = this;
        dioryData["connected-diories"].forEach(function (connectedDioryData) {
            if (connectedDioryData.id !== dioryData.id) {
                var connectedDiory = new Diory(connectedDioryData, false);
                _this.connectedDiories.push(connectedDiory);
            }
        });
    };
    return Diory;
}());
exports.Diory = Diory;
