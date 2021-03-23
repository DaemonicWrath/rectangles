import test from 'ava';

import { add, div, mul, Point } from './point';

test('add', (t) => {
  const p1: Point = [1, 1];
  const p2: Point = [2, 2];
  t.deepEqual(add(p1, p2), [3, 3]);
});

test('mul', (t) => {
  const p1: Point = [2, 2];
  const p2: Point = [2, 2];
  t.deepEqual(mul(p1, p2), [4, 4]);
});

test('div', (t) => {
  const p1: Point = [2, 2];
  const p2: Point = [2, 2];
  t.deepEqual(div(p1, p2), [1, 1]);
});
