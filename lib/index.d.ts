declare class Value {
    data: number;
    _children: never[];
    _op: string;
    grad: number;
    _backward: () => void;
    constructor(data: number, _children?: never[], _op?: string);
    backward(): void;
    add(child: Value): Value;
    neg(): Value;
}
declare const a: Value;
declare const b: Value;
declare const c: Value;
