/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

export function max(prev: number, curr: number) {
  if (curr > prev) {
    return curr;
  }
  return prev;
}

export function sum(prev: number, curr: number) {
  return prev + curr;
}

const DIRS_8 = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function getNeighbors8<T>(grid: T[][], r: number, c: number): T[] {
  const neighbors: T[] = [];

  for (const [dr, dc] of DIRS_8) {
    const nr = r + dr;
    const nc = c + dc;
    if (grid[nr]?.[nc] !== undefined) {
      neighbors.push(grid[nr][nc]);
    }
  }

  return neighbors;
}
