export class Value {
  public grad: number = 0;
  public _backward: () => void = () => {};

  constructor(
    public data: number,
    public _children: Value[] = [],
    public _op = '',
  ) {}

  public backward() {
    const topo: Value[] = [];
    const visited = new Set();
    function buildTopo(v: Value) {
      if (!visited.has(v)) {
        visited.add(v);
        for (const child of v._children) {
          buildTopo(child);
        }
        topo.push(v);
      }
    }
    buildTopo(this);
    this.grad = 1;
    for (const v of topo.reverse()) {
      v._backward();
    }
  }
}

export const add = (...args: Value[]) => {
  const out = new Value(
    args.reduce((acc, cur) => acc + cur.data, 0),
    args,
    '+',
  );

  function _backward() {
    for (const arg of args) {
      arg.grad += 1 * out.grad;
    }
  }
  out._backward = _backward;

  return out;
};

export const sub = (a: Value, b: Value) => {
  const out = new Value(a.data - b.data, [a, b], '-');

  function _backward() {
    a.grad += 1 * out.grad;
    b.grad += -1 * out.grad;
  }
  out._backward = _backward;

  return out;
};

export const mul = (...args: Value[]) => {
  const out = new Value(
    args.reduce((acc, cur) => acc * cur.data, 1),
    args,
    '*',
  );

  function _backward() {
    for (const arg of args) {
      arg.grad += (out.grad * out.data) / arg.data;
    }
  }
  out._backward = _backward;

  return out;
};

// export const mul = (a: Value, b: Value) => {
//   const out = new Value(a.data * b.data, [a, b], '*');

//   function _backward() {
//     a.grad += b.data * out.grad;
//     b.grad += a.data * out.grad;
//   }
//   out._backward = _backward;

//   return out;
// };

export const pow = (a: Value, b: Value) => {
  const out = new Value(a.data ** b.data, [a, b], '**');

  function _backward() {
    a.grad += b.data * a.data ** (b.data - 1) * out.grad;
    b.grad += Math.log(a.data) * a.data ** b.data * out.grad;
  }
  out._backward = _backward;

  return out;
};

export const neg = (a: Value) => {
  const out = new Value(-a.data, [a], '-');

  function _backward() {
    a.grad += -1 * out.grad;
  }
  out._backward = _backward;

  return out;
};

export const div = (a: Value, b: Value) => {
  const out = new Value(a.data / b.data, [a, b], '/');

  function _backward() {
    a.grad += (1 / b.data) * out.grad;
    b.grad += (-a.data / b.data ** 2) * out.grad;
  }
  out._backward = _backward;

  return out;
};

export { Neuron, Layer, MLP } from './nn';
export { toValues, getLoss } from './utils';
