"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logAndFailTest(e) {
    console.log(e.response.error);
    expect(e.response.error).toBeNull();
}
exports.logAndFailTest = logAndFailTest;
