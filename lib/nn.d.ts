import { Value } from '.';
export declare class Neuron {
    w: Value[];
    b: Value;
    constructor(ninputs: number);
    parameters(): Value[];
    run(inputs: Value[]): Value;
}
export declare class Layer {
    neurons: Neuron[];
    constructor(ninputs: number, nneurons: number);
    parameters(): Value[];
    run(inputs: Value[]): Value[];
}
export declare class MLP {
    layers: Layer[];
    constructor(ninputs: number, noutputs: number[]);
    parameters(): Value[];
    run(inputs: Value[]): Value[];
}
export declare const nn: {
    Neuron: typeof Neuron;
    Layer: typeof Layer;
    MLP: typeof MLP;
};
