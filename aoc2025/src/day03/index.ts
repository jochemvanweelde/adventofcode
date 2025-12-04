import run from "aocrunner";
import { max, sum } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

function getJoltage(bank: number[], joltageCount: number) {
  let joltageResult = "";
  let biggestJoltIndex = -1;
  for (let i = 0; i < joltageCount; i++) {
    const sliced = bank.slice(
      biggestJoltIndex + 1,
      bank.length - (joltageCount - i - 1),
    );
    const highestJolt = sliced.reduce(max);
    biggestJoltIndex +=
      sliced.findIndex((battery) => battery === highestJolt) + 1;
    joltageResult += highestJolt.toString();
  }

  return Number(joltageResult);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const banks = input.split("\n").map((bank) => bank.split("").map(Number));

  return banks.map((bank) => getJoltage(bank, 2)).reduce(sum);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const banks = input.split("\n").map((bank) => bank.split("").map(Number));

  return banks.map((bank) => getJoltage(bank, 12)).reduce(sum);
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
      811111111111119
      234234234234278
      818181911112111`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
