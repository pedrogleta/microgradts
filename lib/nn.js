"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLP = exports.Layer = exports.Neuron = void 0;
const engine_1 = require("./engine");
class Neuron {
    w;
    b;
    constructor(ninputs) {
        this.w = Array.from({ length: ninputs }, () => new engine_1.Value(Math.random() * (1 - -1) + -1));
        this.b = new engine_1.Value(0);
    }
    parameters() {
        return [...this.w, this.b];
    }
    run(inputs) {
        return (0, engine_1.add)(this.b, ...inputs.map((input, i) => (0, engine_1.mul)(input, this.w[i])));
    }
}
exports.Neuron = Neuron;
class Layer {
    neurons;
    constructor(ninputs, nneurons) {
        this.neurons = Array.from({ length: nneurons }, () => new Neuron(ninputs));
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
        this.layers = Array.from({ length: noutputs.length }, (_, i) => new Layer(size[i], size[i + 1]));
    }
    parameters() {
        return this.layers.flatMap((layer) => layer.parameters());
    }
    run(inputs) {
        let outputs = inputs;
        for (const layer of this.layers) {
            outputs = layer.run(outputs);
        }
        return outputs.length === 1 ? outputs[0] : outputs;
    }
}
exports.MLP = MLP;
