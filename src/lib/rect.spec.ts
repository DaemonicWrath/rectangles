import test from 'ava';

import {
  doesContain,
  equal,
  flipPoints,
  getIntersectingPoints,
  getIntersectingRect,
  isAdjacent,
  Rect,
} from './rect';

test('equal', (t) => {
  const r1: Rect = [
    [0, 0],
    [1, 1],
  ];
  const r2: Rect = [
    [0, 0],
    [1, 1],
  ];
  t.true(equal(r1, r2));
});

test('equal false', (t) => {
  const r1: Rect = [
    [0, 0],
    [1, 1],
  ];
  const r2: Rect = [
    [0, 0],
    [2, 2],
  ];
  t.false(equal(r1, r2));
});

test('getIntersectingRect', (t) => {
  const r1: Rect = [
    [0, 0],
    [10, 8],
  ];
  const r2: Rect = [
    [2, 3],
    [7, 9],
  ];
  t.deepEqual(getIntersectingRect(r1, r2), [
    [2, 3],
    [7, 8],
  ]);
});

test('getIntersectingRect Fully Within', (t) => {
  const r1: Rect = [
    [0, 0],
    [10, 10],
  ];
  const r2: Rect = [
    [2, 3],
    [3, 4],
  ];
  t.deepEqual(getIntersectingRect(r1, r2), r2);
});

//TODO: getIntersectingRect: test that has no intersecting rects

test('flipPoints', (t) => {
  const r1: Rect = [
    [2, 3],
    [7, 8],
  ];
  t.deepEqual(flipPoints(r1), [
    [2, 8],
    [7, 3],
  ]);
});

test('getIntersectingPoints', (t) => {
  const r1: Rect = [
    [0, 0],
    [10, 8],
  ];
  const r2: Rect = [
    [2, 3],
    [7, 9],
  ];
  t.deepEqual([...getIntersectingPoints(r1, r2)].sort(), [
    [2, 8],
    [7, 8],
  ]);
});

test('doesContain', (t) => {
  const r1: Rect = [
    [0, 0],
    [10, 10],
  ];
  const r2: Rect = [
    [2, 3],
    [3, 4],
  ];
  t.true(doesContain(r1, r2));
});

test('doesContain false', (t) => {
  const r1: Rect = [
    [0, 0],
    [2, 2],
  ];
  const r2: Rect = [
    [3, 3],
    [4, 4],
  ];
  t.false(doesContain(r1, r2));
});

test('isAdjacent sub-line', (t) => {
  const r1: Rect = [
    [0, 0],
    [4, 4],
  ];

  const r2: Rect = [
    [2, 0],
    [3, 0],
  ];

  t.true(isAdjacent(r1, r2));
});

test('isAdjacent proper', (t) => {
  const r1: Rect = [
    [0, 0],
    [4, 4],
  ];

  const r2: Rect = [
    [0, 4],
    [4, 5],
  ];

  t.true(isAdjacent(r1, r2));
});

test('isAdjacent partial', (t) => {
  const r1: Rect = [
    [0, 0],
    [4, 4],
  ];

  const r2: Rect = [
    [4, 0],
    [5, 6],
  ];

  t.true(isAdjacent(r1, r2));
});

test('isAdjacent not', (t) => {
  const r1: Rect = [
    [0, 0],
    [4, 4],
  ];

  const r2: Rect = [
    [10, 10],
    [11, 11],
  ];

  t.false(isAdjacent(r1, r2));
});
