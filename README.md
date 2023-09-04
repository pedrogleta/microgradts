
# microgradts

![seal](seal.webp)

A tiny Autograd engine Based off of Andrej Karpathy's [Micrograd](https://github.com/karpathy/micrograd/tree/master) in Python. Implements backpropagation over a dynamically built DAG that operates over scalar values.

### Installation

```bash
npm install microgradts
```
```bash
yarn add microgradts
```

### Example usage

Below is a slightly contrived example showing a number of possible supported operations:

```typescript
import { Value, add, mul, pow } from 'microgradts'

const a = new Value(-4.0)
const b = new Value(2.0)
const c = add(a, b)
const d = add(mul(a, b), pow(b, new Value(3))) a * b + b**3
const e = new Value(3.0)
const f = div(d, e)
f.backward();
```

And an example usage of the Neural Net APi:

```typescript
const n = new MLP(3, [4, 4, 1]);

const xs = [
  [2.0, 3.0, -1.0],
  [3.0, -1.0, 0.5],
  [0.5, 1.0, 1.0],
  [1.0, 1.0, -1.0],
].map((x) => toValues(x));
const ys = toValues([1.0, -1.0, -1.0, 1.0]);

for (let i = 0; i < 200; i++) {
  const ypred = xs.map((x) => n.run(x));
  const loss = getLoss(ys, ypred as Value[]);

  for (const p of n.parameters()) {
    p.grad = 0;
  }
  loss.backward();

  for (const p of n.parameters()) {
    p.data -= 0.01 * p.grad;
  }

  console.log(i, loss.data);
}
```

## Todo
- Implement visualization with Graphviz

### License

MIT