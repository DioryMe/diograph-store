"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Diory = (function () {
    function Diory(data) {
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
    }
    return Diory;
}());
exports.Diory = Diory;
