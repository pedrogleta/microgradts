
# microgradts

![seal](seal.webp)

A tiny Autograd engine Based off of Andrej Karpathy's Micrograd in Python. Implements backpropagation over a dynamically built DAG that operates over scalar values.

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

## Todo
- Implement visualization with Graphviz

### License

MIT