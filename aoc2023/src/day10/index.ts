import run from "aocrunner";

let FIELD_WIDTH = 0;

const parseInput = (rawInput: string) => rawInput.replaceAll('\n', '').split('');

enum Direction {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
  FINISHED = 'F',
}

function goTroughPipe(index: number, pipe: string, prevDirection: Direction){
  switch (pipe) {
    case '|':
      if (prevDirection === Direction.NORTH) return {index: index - FIELD_WIDTH, direction: Direction.NORTH};
      if (prevDirection === Direction.SOUTH) return {index: index + FIELD_WIDTH, direction: Direction.SOUTH};
      throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
    case '-':
      if (prevDirection === Direction.EAST) return {index: index + 1, direction: Direction.EAST};
      if (prevDirection === Direction.WEST) return {index: index - 1, direction: Direction.WEST};
      throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
    case 'L':
      if (prevDirection === Direction.SOUTH) return {index: index + 1, direction: Direction.EAST};
      if (prevDirection === Direction.WEST) return {index: index - FIELD_WIDTH, direction: Direction.NORTH};
      throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
    case 'J':
      if (prevDirection === Direction.SOUTH) return {index: index - 1, direction: Direction.WEST};
      if (prevDirection === Direction.EAST) return {index: index - FIELD_WIDTH, direction: Direction.NORTH};
      throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
    case '7':
      if (prevDirection === Direction.NORTH) return {index: index - 1, direction: Direction.WEST};
      if (prevDirection === Direction.EAST) return {index: index + FIELD_WIDTH, direction: Direction.SOUTH};
      throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
    case 'F':
      if (prevDirection === Direction.NORTH) return {index: index + 1, direction: Direction.EAST};
      if (prevDirection === Direction.WEST) return {index: index + FIELD_WIDTH, direction: Direction.SOUTH};
      throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
    case '.':
      throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
    case 'S':
      return {index: index, direction: Direction.FINISHED};
    }
  throw new Error(`Invalid direction for pipe ${pipe} with prevDirection ${prevDirection}`);
}

const part1 = (rawInput: string) => {
  FIELD_WIDTH = rawInput.indexOf('\n');
  const input = parseInput(rawInput);

  let steps = 0;

  let index = input.indexOf('S');
  let direction;
  const charNorth = input[index - FIELD_WIDTH];
  const charEast = input[index + 1];
  const charSouth = input[index + FIELD_WIDTH];

  if (charNorth === '|' || charNorth === 'J' || charNorth === '7' || charNorth === 'F') {
    direction = Direction.NORTH;
    index = index - FIELD_WIDTH;
  } else if (charEast === '-' || charEast === '7' || charEast === 'J') {
    direction = Direction.EAST;
    index = index + 1;
  } else if (charSouth === '|' || charSouth === 'L' || charSouth === 'J') {
    direction = Direction.SOUTH;
    index = index + FIELD_WIDTH;
  }
  // No need to check the last case because there must be 2/4 pipes connected to S

  while (true) {
    const pipe = input[index];
    const result = goTroughPipe(index, pipe, direction!);
    index = result.index;
    direction = result.direction;
    steps++;
    if (direction === Direction.FINISHED) break;
  }
  return steps/2;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
        expected: 4,
      },
      {
        input: `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
