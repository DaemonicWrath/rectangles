import * as line from './line';
import type { Point } from './point';

export type Rect = readonly [Point, Point];

// This could be cleaner but a manual check is much faster
export const equal = (r1: Rect, r2: Rect): boolean =>
  r1[0][0] === r2[0][0] &&
  r1[0][1] === r2[0][1] &&
  r1[1][0] === r2[1][0] &&
  r1[1][1] === r2[1][1];

// slightly inefficient to call flipPoints for each call but provides convenience
export const top = (r1: Rect): line.Line => [flipPoints(r1)[0], r1[1]];
export const bottom = (r1: Rect): line.Line => [r1[1], flipPoints(r1)[1]];
export const left = (r1: Rect): line.Line => [r1[0], flipPoints(r1)[0]];
export const right = (r1: Rect): line.Line => [r1[1], flipPoints(r1)[1]];

// returns a new rectangle that has the points of the opposite corners of a existing rectangle
// TODO: Example
export const flipPoints = (r1: Rect): Rect => {
  return [
    [r1[0][0], r1[1][1]],
    [r1[1][0], r1[0][1]],
  ];
};

// Generates a new rectangle that is the intersection of r1 and r2.
// if r2 is fully within r1 the output will be a rectangle with the same points as r2
export const getIntersectingRect = (r1: Rect, r2: Rect): Rect | undefined => {
  // generate
  const p1: Point = [
    Math.max(r1[0][0], r2[0][0]),
    Math.max(r1[0][1], r2[0][1]),
  ];
  const p2: Point = [
    Math.min(r1[1][0], r2[1][0]),
    Math.min(r1[1][1], r2[1][1]),
  ];

  if (p1[0] > p2[0] || p1[1] > p2[0]) {
    return undefined;
  }

  return [p1, p2];
};

export const getIntersectingPoints = (r1: Rect, r2: Rect): readonly Point[] => {
  const intersectingRect = getIntersectingRect(r1, r2);

  if (!intersectingRect) {
    return [];
  }

  const r1Flipped = flipPoints(r1);

  // get the 4 points of the rect
  return [...intersectingRect, ...flipPoints(intersectingRect)].filter((p) => {
    //check x left
    if (p[0] === r1[0][0] && p[1] <= r1[0][1] && p[1] >= r1Flipped[0][1]) {
      return true;
    }

    //check x right
    if (p[0] === r1[1][0] && p[1] <= r1Flipped[1][1] && p[1] >= r1[1][1]) {
      return true;
    }

    // check y bottom
    if (p[1] === r1[0][1] && p[0] >= r1[0][1] && p[0] <= r1Flipped[1][0]) {
      return true;
    }

    //check y top
    if (p[1] === r1[1][1] && p[0] <= r1[1][0] && p[0] >= r1Flipped[0][0]) {
      return true;
    }

    return false;
  });
};

// Checks if r1 fully contains r2
export const doesContain = (r1: Rect, r2: Rect): boolean => {
  const intersectingRect = getIntersectingRect(r1, r2);

  // No intersection
  if (!intersectingRect) {
    return false;
  }

  // check if intersectingRect is equal to r2
  return equal(intersectingRect, r2);
};

export const isAdjacent = (r1: Rect, r2: Rect): boolean => {
  const intersectingRect = getIntersectingRect(r1, r2);

  // No intersection
  if (!intersectingRect) {
    return false;
  }

  const topOverlap: boolean = line.overlap(
    top(r1),
    bottom(intersectingRect),
    0
  );

  const bottomOverlap: boolean = line.overlap(
    bottom(r1),
    top(intersectingRect),
    0
  );

  const leftOverlap: boolean = line.overlap(
    left(r1),
    right(intersectingRect),
    1
  );

  const rightOverlap: boolean = line.overlap(
    right(r1),
    left(intersectingRect),
    1
  );

  return topOverlap || bottomOverlap || leftOverlap || rightOverlap;
};
