import run from 'aocrunner';
import { writeOutputToFile } from '../utils/writeOutputToFile.js';

type Coordinate = [number, number];
type AntennaMapType = {
  [key: string]: Coordinate[];
};

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((line) => line.split(''));

const getAntennaMap = (input: string[][]) => {
  const antennaMap: AntennaMapType = {};

  input.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== '.') {
        if (!antennaMap[cell]) {
          antennaMap[cell] = [];
        }

        antennaMap[cell].push([x, y]);
      }
    });
  });

  return antennaMap;
};

const getAntiNodesFromCoordinates = (
  coordinate1: Coordinate,
  coordinate2: Coordinate,
) => {
  const [x1, y1] = coordinate1;
  const [x2, y2] = coordinate2;

  const xDiff = x1 - x2;
  const yDiff = y1 - y2;

  const loc1 = [x1 + xDiff, y1 + yDiff];
  const loc2 = [x1 - xDiff, y1 - yDiff];
  const loc3 = [x2 + xDiff, y2 + yDiff];
  const loc4 = [x2 - xDiff, y2 - yDiff];

  return [loc1, loc2, loc3, loc4].filter(
    (loc) =>
      loc.toString() !== coordinate1.toString() &&
      loc.toString() !== coordinate2.toString(),
  );
};

const getResonatingAntiNodesFromCoordinates = (
  coordinate1: Coordinate,
  coordinate2: Coordinate,
  maxX: number,
  maxY: number,
) => {
  const [x1, y1] = coordinate1;
  const [x2, y2] = coordinate2;

  const xDiff = x1 - x2;
  const yDiff = y1 - y2;

  const locations = [];

  let addResonate = [x1, y1];
  let subtractResonate = [x2, y2];

  while (
    addResonate[0] >= 0 &&
    addResonate[0] < maxX &&
    addResonate[1] >= 0 &&
    addResonate[1] < maxY
  ) {
    locations.push(addResonate);
    addResonate = [addResonate[0] + xDiff, addResonate[1] + yDiff];
  }

  while (
    subtractResonate[0] >= 0 &&
    subtractResonate[0] < maxX &&
    subtractResonate[1] >= 0 &&
    subtractResonate[1] < maxY
  ) {
    locations.push(subtractResonate);
    subtractResonate = [
      subtractResonate[0] - xDiff,
      subtractResonate[1] - yDiff,
    ];
  }

  return locations.filter(
    (loc) =>
      loc.toString() !== coordinate1.toString() &&
      loc.toString() !== coordinate2.toString(),
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const antennaMap = getAntennaMap(input);

  for (const antenna in antennaMap) {
    for (let i = 0; i < antennaMap[antenna].length; i++) {
      for (let j = i + 1; j < antennaMap[antenna].length; j++) {
        const [coord1, coord2] = [
          antennaMap[antenna][i],
          antennaMap[antenna][j],
        ];

        const antiNodes = getAntiNodesFromCoordinates(coord1, coord2);

        antiNodes.forEach((node) => {
          if (input[node[1]]?.[node[0]] !== undefined) {
            input[node[1]][node[0]] = '#';
          }
        });
      }
    }
  }

  const antiNodeCount = input.flat().filter((cell) => cell === '#').length;

  // writeOutputToFile(input.map((row) => row.join('')).join('\n'), 8);

  return antiNodeCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const antennaMap = getAntennaMap(input);

  for (const antenna in antennaMap) {
    for (let i = 0; i < antennaMap[antenna].length; i++) {
      for (let j = i + 1; j < antennaMap[antenna].length; j++) {
        const [coord1, coord2] = [
          antennaMap[antenna][i],
          antennaMap[antenna][j],
        ];

        const antiNodes = getResonatingAntiNodesFromCoordinates(
          coord1,
          coord2,
          input[0].length,
          input.length,
        );

        antiNodes.forEach((node) => {
          if (input[node[1]]?.[node[0]] !== undefined) {
            input[node[1]][node[0]] = '#';
          }
        });
      }
    }
  }

  const antiNodeCount = input.flat().filter((cell) => cell !== '.').length;

  // writeOutputToFile(input.map((row) => row.join('')).join('\n'), 8);

  return antiNodeCount;
};

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
