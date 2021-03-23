export type Point = readonly [number, number];

type op = (n1: number, n2: number) => number;
type opFn = (p1: Point, p2: Point) => Point;

const operation = (fn: op): opFn => {
  return (p1: Point, p2: Point): Point => {
    return [fn(p1[0], p2[0]), fn(p1[1], p2[1])];
  };
};

export const add = operation((n1, n2) => n1 + n2);

export const mul = operation((n1, n2) => n1 * n2);

export const div = operation((n1, n2) => n1 / n2);
