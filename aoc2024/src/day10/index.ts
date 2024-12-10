import run from 'aocrunner';

type HikeNode = {
  value: number;
  x: number;
  y: number;
};

const parseInput = (rawInput: string): HikeNode[][] =>
  rawInput.split('\n').map((line, y) =>
    line.split('').map((char, x) => ({
      value: parseInt(char),
      x,
      y,
    })),
  );

const searchHikeTrailTail = (
  input: HikeNode[][],
  x: number,
  y: number,
): HikeNode[] => {
  const currentNode = input[y][x];

  if (currentNode.value === 9) return [currentNode];

  const neighbors = [
    input[y - 1]?.[x],
    input[y + 1]?.[x],
    input[y][x - 1],
    input[y][x + 1],
  ] as (HikeNode | undefined)[];

  const relevantNeighbors = neighbors.filter(
    (neighbor) => neighbor && currentNode.value - neighbor.value === -1,
  );

  return relevantNeighbors
    .map((neighbor) => searchHikeTrailTail(input, neighbor.x, neighbor.y))
    .flat();
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let trails = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x].value === 0) {
        const searchResult = searchHikeTrailTail(input, x, y);
        const nodeSet = new Set();
        searchResult.forEach((node) => {
          nodeSet.add(`${node.x},${node.y}`);
        });
        trails += nodeSet.size;
      }
    }
  }

  return trails;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let trails = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x].value === 0) {
        const searchResult = searchHikeTrailTail(input, x, y);
        trails += searchResult.length;
      }
    }
  }

  return trails;
};

run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
