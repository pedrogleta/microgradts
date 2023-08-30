import { Value, add, mul } from '.';

export class Neuron {
  public w: Value[];
  public b: Value;
  constructor(ninputs: number) {
    this.w = new Array(ninputs).map(
      (_) => new Value(Math.random() * (1 - -1) + -1),
    );
    this.b = new Value(0);
  }

  public parameters() {
    return [...this.w, this.b];
  }

  public run(inputs: Value[]) {
    return add(this.b, ...inputs.map((input, i) => mul(input, this.w[i])));
  }
}

export class Layer {
  public neurons: Neuron[];

  constructor(ninputs: number, nneurons: number) {
    this.neurons = new Array(nneurons).map((_) => new Neuron(ninputs));
  }

  public parameters() {
    return this.neurons.flatMap((neuron) => neuron.parameters());
  }

  public run(inputs: Value[]) {
    return this.neurons.map((neuron) => neuron.run(inputs));
  }
}

export class MLP {
  public layers: Layer[];

  constructor(ninputs: number, noutputs: number[]) {
    const size = [ninputs, ...noutputs];
    this.layers = new Array(size.length - 1).map(
      (i) => new Layer(size[i], size[i + 1]),
    );
  }

  public parameters() {
    return this.layers.flatMap((layer) => layer.parameters());
  }

  public run(inputs: Value[]) {
    let outputs = inputs;
    for (const layer of this.layers) {
      outputs = layer.run(outputs);
    }
    return outputs;
  }
}

export const nn = {
  Neuron,
  Layer,
  MLP,
};
