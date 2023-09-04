export declare class Value {
    data: number;
    _children: Value[];
    _op: string;
    grad: number;
    _backward: () => void;
    constructor(data: number, _children?: Value[], _op?: string);
    backward(): void;
}
export declare const add: (...args: Value[]) => Value;
export declare const sub: (a: Value, b: Value) => Value;
export declare const mul: (...args: Value[]) => Value;
export declare const pow: (a: Value, b: Value) => Value;
export declare const neg: (a: Value) => Value;
export declare const div: (a: Value, b: Value) => Value;
export { Neuron, Layer, MLP } from './nn';
export { toValues, getLoss } from './utils';
