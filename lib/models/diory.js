"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Diory = /** @class */ (function () {
    function Diory(data) {
        this.connectedDiories = [];
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
        if (data["connected-diories"]) {
            this.addConnectedDiories(data["connected-diories"]);
        }
    }
    Diory.prototype.addConnectedDiories = function (connectedDioriesData) {
        var _this = this;
        connectedDioriesData.forEach(function (connectedDioryData) {
            var connectedDiory = new Diory(connectedDioryData);
            _this.connectedDiories.push(connectedDiory);
        });
    };
    return Diory;
}());
exports.Diory = Diory;
