"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nn = exports.MLP = exports.Layer = exports.Neuron = void 0;
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
class Layer {
    neurons;
    constructor(ninputs, nneurons) {
        this.neurons = new Array(nneurons).map((_) => new Neuron(ninputs));
    }
    parameters() {
        return this.neurons.flatMap((neuron) => neuron.parameters());
    }
    run(inputs) {
        return this.neurons.map((neuron) => neuron.run(inputs));
    }
}
exports.Layer = Layer;
class MLP {
    layers;
    constructor(ninputs, noutputs) {
        const size = [ninputs, ...noutputs];
        this.layers = new Array(size.length - 1).map((i) => new Layer(size[i], size[i + 1]));
    }
    parameters() {
        return this.layers.flatMap((layer) => layer.parameters());
    }
    run(inputs) {
        let outputs = inputs;
        for (const layer of this.layers) {
            outputs = layer.run(outputs);
        }
        return outputs;
    }
}
exports.MLP = MLP;
exports.nn = {
    Neuron,
    Layer,
    MLP,
};
