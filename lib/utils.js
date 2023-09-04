"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoss = exports.toValues = void 0;
const engine_1 = require("./engine");
function toValues(arr) {
    return arr.map((x) => new engine_1.Value(x));
}
exports.toValues = toValues;
const getLoss = (ygt, ypred) => {
    let result = new engine_1.Value(0);
    for (let i = 0; i < ygt.length; i++) {
        result = (0, engine_1.add)(result, (0, engine_1.mul)((0, engine_1.sub)(ygt[i], ypred[i]), (0, engine_1.sub)(ygt[i], ypred[i])));
    }
    return result;
};
exports.getLoss = getLoss;
