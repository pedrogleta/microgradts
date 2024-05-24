# MicrogradTS

![seal](seal.jpg)

#### [Video Demo](https://www.youtube.com/watch?v=0y3ZgxFiV9k)

#### Description:
MicrogradTS is a tiny autograd engine based on Andrej Karpathy's [Micrograd](https://github.com/karpathy/micrograd/tree/master) in Python. Autograd is a technique that allows you to automatically compute the gradients of any function with respect to its inputs, which is useful for optimization and machine learning. MicrogradTS implements backpropagation over a dynamically built directed acyclic graph (DAG) that operates over scalar values. This means that you can define complex functions using basic arithmetic operations and then get the derivatives of those functions with respect to any variable.

### Features

Some of the features of MicrogradTS are:

- Supports basic arithmetic operations such as addition, subtraction, multiplication, division and power
- Supports unary functions such as exp
- Supports loss functions such as mean squared error (MSE)
- Supports neural network models such as multilayer perceptron (MLP)
- Supports automatic differentiation of any user-defined function
- Supports visualization of the computation graph with Graphviz (TODO)

### Installation

You can install MicrogradTS using npm or yarn:

```bash
npm install microgradts
```
```bash
yarn add microgradts
```

You will also need to install Graphviz if you want to visualize the computation graph (TODO).

### Example usage

Below is a slightly contrived example showing a number of possible supported operations:

```typescript
import { Value, add, mul, pow, div } from 'microgradts'

const a = new Value(4.0)
const b = new Value(-2.0)
const c = add(a, b)
const d = add(mul(a, b), pow(b, new Value(3)))
const e = new Value(3.0)
const f = div(d, e)
f.backward(); // compute the gradient of f with respect to all the variables in the graph
console.log(f.data); // print the data of f: -5.3333333333333333
console.log(a.grad); // print the gradient of f with respect to a: -0.6666666666666666
console.log(b.grad); // print the gradient of f with respect to b: 5.333333333333333
```

And an example usage of the Neural Net API:

```typescript
const n = new MLP(3, [4, 4, 1]); // create a multilayer perceptron model with 3 input units, 2 hidden layers with 4 units each, and 1 output unit

const xs = [
  [2.0, 3.0, -1.0],
  [3.0, -1.0, 0.5],
  [0.5, 1.0, 1.0],
  [1.0, 1.0, -1.0],
].map((x) => toValues(x)); // create an array of input values from an array of numbers
const ys = toValues([1.0, -1.0, -1.0, 1.0]); // create an array of output values from an array of numbers

for (let i = 0; i < 200; i++) { // train the model for 200 iterations
  const ypred = xs.map((x) => n.run(x)); // run the model on each input and get an array of predictions
  const loss = getLoss(ys, ypred as Value[]); // compute the mean squared error loss between the predictions and the outputs

  for (const p of n.parameters()) { // loop over all the parameters of the model
    p.grad = 0; // reset their gradients to zero
  }
  loss.backward(); // compute the gradient of the loss with respect to all the parameters

  for (const p of n.parameters()) { // loop over all the parameters of the model
    p.data -= 0.01 * p.grad; // update their data by subtracting a small fraction of their gradients
  }

  console.log(i, loss.data); // print the iteration number and the loss value
}
```

## Todo
- Implement visualization with Graphviz: This feature will allow you to generate a graphical representation of the computation graph using the Graphviz library. This will help you debug and understand your functions and models better.

### License

MIT: This project is licensed under the MIT License, which means that you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, as long as you include the original license notice and disclaimer in any copy. See the LICENSE file for more details.
