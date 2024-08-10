import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

function rollNorth(input: string[][]): string[][] {
  let mutated = false;
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      if (input[x][y] === 'O' && input[x - 1]?.[y] === '.') {
        input[x][y] = '.';
        input[x - 1][y] = 'O';
        mutated = true;
      }
    }
  }
  return mutated ? rollNorth(input) : input;
}

function calculateScore(input: string[][]): number {
  let rowValue = input.length;
  let totalValue = 0;
  for (const row of input) {
    totalValue += row.reduce(
      (acc, item) => (item === 'O' ? acc + rowValue : acc),
      0
    );
    rowValue -= 1;
  }
  return totalValue;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split('\n')
    .map((row) => row.split(''));

  const northInput = rollNorth(input);

  return calculateScore(northInput);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split('\n')
    .map((row) => row.split(''));

  return;
};

run({
  part1: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
