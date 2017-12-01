"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connection = /** @class */ (function () {
    function Connection(data) {
        if (data === undefined) {
            data = {};
        }
        ;
        this.id = data["id"];
        this.fromDioryId = data["from-diory-id"];
        this.toDioryId = data["to-diory-id"];
    }
    return Connection;
}());
exports.Connection = Connection;
