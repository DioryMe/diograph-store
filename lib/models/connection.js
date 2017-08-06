"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connection = (function () {
    function Connection(data) {
        if (data === undefined) {
            data = {};
        }
        ;
        this.fromDioryId = data["from-diory-id"];
        this.toDioryId = data["to-diory-id"];
    }
    return Connection;
}());
exports.Connection = Connection;
