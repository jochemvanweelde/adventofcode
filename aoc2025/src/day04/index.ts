import run from "aocrunner";
import { getNeighbors8 } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

function forkPaperRolls(rawInput: string) {
  const input = parseInput(rawInput)
    .split("\n")
    .map((row) => row.split(""));

  const output = input.map((row) => [...row]);

  let resultCount = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      output[y][x] = input[y][x];
      if (input[y][x] === ".") {
        continue;
      }

      const neighbors = getNeighbors8(input, y, x);
      const surroundingPaper = neighbors.reduce((prev, curr) => {
        if (curr === "@") {
          return prev + 1;
        }
        return prev;
      }, 0);
      if (surroundingPaper < 4) {
        output[y][x] = "."; //Cleanup paper roll
        resultCount += 1;
      }
    }
  }

  return { resultCount, output };
}

const part1 = (rawInput: string) => {
  const { resultCount, output } = forkPaperRolls(rawInput);

  // console.log(rawInput);
  // console.log("=====");
  // console.log(output.map((row) => row.join("")).join("\n"));

  return resultCount;
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  let result = 0;
  while (true) {
    const { resultCount, output } = forkPaperRolls(input);
    result += resultCount;
    input = output.map((row) => row.join("")).join("\n");
    if (resultCount === 0) {
      break;
    }
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
