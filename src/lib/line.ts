import { Point } from './point';

// this may be the same as Rect but we want to convey different meaning with the types
export type Line = readonly [Point, Point];

// check if the lines overlap assuming that l1[accessor] < l2[accessor]
export const overlap = (l1: Line, l2: Line, accessor: 0 | 1): boolean =>
  !(l1[0][accessor] < l2[1][accessor] || l1[1][accessor] < l2[0][accessor]);
