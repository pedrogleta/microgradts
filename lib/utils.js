"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toValues = void 0;
const _1 = require(".");
function toValues(arr) {
    return arr.map((x) => new _1.Value(x));
}
exports.toValues = toValues;
