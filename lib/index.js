"use strict";
class Value {
    data;
    _children;
    _op;
    grad = 0;
    _backward = () => { };
    constructor(data, _children = [], _op = '') {
        this.data = data;
        this._children = _children;
        this._op = _op;
    }
    backward() {
        const topo = [];
        const visited = new Set();
        function buildTopo(v) {
            if (!visited.has(v)) {
                visited.add(v);
                for (const child of v._children) {
                    buildTopo(child);
                }
                topo.push(v);
            }
        }
        buildTopo(this);
    }
    add(child) {
        const out = new Value(this.data + child.data, [], '+');
        let thisGrad = this.grad;
        function _backward() {
            thisGrad += 1 * out.grad;
            child.grad += 1 * out.grad;
        }
        out._backward = _backward;
        return out;
    }
    neg() {
        return new Value(this.data * -1, [], 'neg');
    }
}
const a = new Value(1);
const b = new Value(2);
const c = a.add(b);
c.backward();
console.log({ a: a.grad, b: b.grad, c: c.grad });
