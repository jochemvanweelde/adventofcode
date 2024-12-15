import run from 'aocrunner';
import { multiply } from 'mathjs';

type Robot = {
  location: { x: number; y: number };
  velocity: { x: number; y: number };
};

const AMOUNT_OF_STEPS = 100;

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((line) => {
    const [p1, p2, v1, v2] = line.match(/[0-9-]+/g) || [];
    return {
      location: { x: parseInt(p1), y: parseInt(p2) },
      velocity: { x: parseInt(v1), y: parseInt(v2) },
    };
  });

const cycleNumber = (num: number, range: number): number =>
  ((num % range) + range * AMOUNT_OF_STEPS) % range;

const simulateRobot = (
  robot: Robot,
  stepAmount: number,
  boardSize: { x: number; y: number },
): Robot => {
  const {
    location: { x: x1, y: y1 },
    velocity: { x: vx, y: vy },
  } = robot;

  const newX = cycleNumber(x1 + vx * stepAmount, boardSize.x);
  const newY = cycleNumber(y1 + vy * stepAmount, boardSize.y);

  return {
    ...robot,
    location: { x: newX, y: newY },
  };
};

const countRobotsInQuadrants = (
  robots: Robot[],
  boardSize: { x: number; y: number },
) => {
  const quadrants = Array.from({ length: 4 }, () => 0);

  robots.forEach(({ location: { x, y } }) => {
    if (
      x === Math.floor(boardSize.x / 2) ||
      y === Math.floor(boardSize.y / 2)
    ) {
      return;
    }

    const quadrant =
      (y < boardSize.y / 2 ? 0 : 2) + (x < boardSize.x / 2 ? 0 : 1);
    quadrants[quadrant]++;
  });

  return quadrants;
};

const printBoard = (robots: Robot[], boardSize: { x: number; y: number }) => {
  const board = Array.from({ length: boardSize.y }, () =>
    Array(boardSize.x).fill('.'),
  );

  robots.forEach(({ location: { x, y } }) => {
    board[y][x] = 'X';
  });

  const boardString = board.map((row) => row.join('')).join('\n');
  console.log(boardString);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const boardSize = { x: 101, y: 103 };

  const robots = input.map((robot) =>
    simulateRobot(robot, AMOUNT_OF_STEPS, boardSize),
  );

  // printBoard(robots, boardSize);

  const quadrants = countRobotsInQuadrants(robots, boardSize);

  // console.log(quadrants);

  return multiply(...quadrants);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const boardSize = { x: 101, y: 103 };
  let robots = input;
  const CONSECUTIVE_COUNT = 20;

  let counter = 0;

  while (true) {
    robots = robots.map((robot) => simulateRobot(robot, 1, boardSize));
    counter++;

    const rows = Array.from({ length: boardSize.y }, () =>
      Array(boardSize.x).fill(false),
    );
    robots.forEach(({ location: { x, y } }) => {
      rows[y][x] = true;
    });

    const situationFound = rows.some((row) => {
      let consecutiveCount = 0;
      for (const cell of row) {
        if (cell) {
          consecutiveCount++;
          if (consecutiveCount >= CONSECUTIVE_COUNT) return true;
        } else {
          consecutiveCount = 0;
        }
      }
      return false;
    });

    if (situationFound) {
      printBoard(robots, boardSize);
      break;
    }
  }

  return counter;
};

run({
  part1: {
    tests: [
      {
        input: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
        expected: 12,
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
  // onlyTests: true, // Comment out to run on the actual input
});
