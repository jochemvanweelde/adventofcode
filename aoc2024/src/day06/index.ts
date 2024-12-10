import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((line) => line.split(''));

type Position = {
  x: number;
  y: number;
};
type Direction = 'N' | 'E' | 'S' | 'W';

const walkUntilWall = (
  map: string[][],
  position: Position,
  direction: Direction,
) => {
  let nextPosition: Position | null = { ...position };
  while (true) {
    const potentialNextPosition = {
      x: nextPosition.x + (direction === 'E' ? 1 : direction === 'W' ? -1 : 0),
      y: nextPosition.y + (direction === 'S' ? 1 : direction === 'N' ? -1 : 0),
    };
    if (map[potentialNextPosition.y]?.[potentialNextPosition.x] === '#') {
      break;
    }
    if (map[potentialNextPosition.y]?.[potentialNextPosition.x] === undefined) {
      nextPosition = null;
      break;
    }
    map[potentialNextPosition.y][potentialNextPosition.x] = 'X';
    nextPosition = potentialNextPosition;
  }
  return nextPosition as Position | null;
};

const turnRight = (direction: Direction): Direction => {
  switch (direction) {
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    case 'W':
      return 'N';
  }
};

const getPositionOfGuard = (map: string[][], guardChar = '^'): Position => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === guardChar) {
        return { x, y };
      }
    }
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = input;
  let position = getPositionOfGuard(map);
  map[position.y][position.x] = 'X';
  let direction: Direction = 'N';
  let counter = 0;
  const MAX_ITERATIONS = 1000;

  while (true) {
    position = walkUntilWall(map, position, direction);

    if (position === null) {
      break;
    }

    counter++;
    if (counter >= MAX_ITERATIONS) {
      return null;
    }

    direction = turnRight(direction);
  }

  // writeOutputToFile(
  //   map.map((line) => line.join('')).join('\n'),
  //   6,
  //   'output.txt',
  // );

  // count the number of Xs
  let count = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'X') {
        count++;
      }
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const result = rawInput.split('').filter((char, index) => {
    if (char === '.') {
      const newString =
        rawInput.slice(0, index) + '#' + rawInput.slice(index + 1);
      return part1(newString) === null;
    }
    return false;
  });

  return result.length;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
      {
        input: `...#..
....#.
...^..
......`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
