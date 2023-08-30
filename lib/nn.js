"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neuron = void 0;
const _1 = require(".");
class Neuron {
    w;
    b;
    constructor(ninputs) {
        this.w = new Array(ninputs).map((_) => new _1.Value(Math.random() * (1 - -1) + -1));
        this.b = new _1.Value(0);
    }
    parameters() {
        return [...this.w, this.b];
    }
    run(inputs) {
        return (0, _1.add)(this.b, ...inputs.map((input, i) => (0, _1.mul)(input, this.w[i])));
    }
}
exports.Neuron = Neuron;
