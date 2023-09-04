import { Value } from '.';

export function toValues(arr: number[]): Value[] {
  return arr.map((x) => new Value(x));
}
