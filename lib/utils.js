"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoss = exports.toValues = void 0;
const _1 = require(".");
function toValues(arr) {
    return arr.map((x) => new _1.Value(x));
}
exports.toValues = toValues;
const getLoss = (ygt, ypred) => {
    let result = new _1.Value(0);
    for (let i = 0; i < ygt.length; i++) {
        result = (0, _1.add)(result, (0, _1.mul)((0, _1.sub)(ygt[i], ypred[i]), (0, _1.sub)(ygt[i], ypred[i])));
    }
    return result;
};
exports.getLoss = getLoss;
