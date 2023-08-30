import { Value } from '.';
export declare class Neuron {
    w: Value[];
    b: Value;
    constructor(ninputs: number);
    parameters(): Value[];
    run(inputs: Value[]): Value;
}
