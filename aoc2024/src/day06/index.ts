import run from 'aocrunner';
import { writeOutputToFile } from '../utils/writeOutputToFile.js';

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

const isOnTheSameAxis = (position1: Position, position2: Position) =>
  position1.x === position2.x || position1.y === position2.y;

const simulateExtraObstacleForInfiniteLoop = (
  map: string[][],
  position: Position,
  direction: Direction,
) => {
  /**
   * For this direction, we place an obstacle in each next cell in this direction (one at a time).
   * We simulate the walkUntilWall 4 times, if the guard is on the same axis as our starting position,
   * we know that the guard is in an infinite loop.
   */

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

    //Check if next position could create an infinite loop
    const mapCopy = map.map((line) => line.slice());
    mapCopy[potentialNextPosition.y][potentialNextPosition.x] = '#';
    let positionCopy = { ...position };
    let directionCopy = direction;
    let count = 0;
    const AMOUNT_OF_FULL_ROTATIONS = 36;
    while (count < 4 * AMOUNT_OF_FULL_ROTATIONS) {
      positionCopy = walkUntilWall(mapCopy, positionCopy, directionCopy);

      if (positionCopy === null) {
        break;
      }

      directionCopy = turnRight(directionCopy);
      count++;
      if (
        count % 4 === 0 &&
        positionCopy &&
        isOnTheSameAxis(position, positionCopy)
      ) {
        mapCopy[potentialNextPosition.y][potentialNextPosition.x] = 'O';
        map[potentialNextPosition.y][potentialNextPosition.x] = 'O';
        // console.log(
        //   `Infinite loop detected at ${potentialNextPosition.x},${potentialNextPosition.y}`,
        // );
        // console.log({
        //   map: map.map((line) => line.join('')).join('\n'),
        //   mapCopy: mapCopy.map((line) => line.join('')).join('\n'),
        // });
        break;
      }
    }

    nextPosition = potentialNextPosition;
  }
  return nextPosition;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = input;
  let position = getPositionOfGuard(map);
  map[position.y][position.x] = 'X';
  let direction: Direction = 'N';

  while (true) {
    position = walkUntilWall(map, position, direction);

    if (position === null) {
      break;
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
  const input = parseInput(rawInput);

  const map = input;
  let position = getPositionOfGuard(map);
  map[position.y][position.x] = 'X';
  let direction: Direction = 'N';

  while (true) {
    const nextPosition = simulateExtraObstacleForInfiniteLoop(
      map,
      position,
      direction,
    );

    if (nextPosition === null) {
      break;
    }

    position = nextPosition;
    direction = turnRight(direction);
  }

  writeOutputToFile(
    map.map((line) => line.join('')).join('\n'),
    6,
    'output.txt',
  );

  // Count '0' in the map
  let count = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        count++;
      }
    }
  }

  return count;
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
