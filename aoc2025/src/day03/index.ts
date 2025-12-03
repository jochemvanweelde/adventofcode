import run from "aocrunner";
import { max, sum } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

function getJoltage(bank: number[]) {
  const firstHighest = bank.slice(0, bank.length - 1).reduce(max);
  const firstIndex = bank.findIndex((battery) => battery === firstHighest);
  const secondHighest = bank.slice(firstIndex + 1).reduce(max);

  return Number(`${firstHighest}${secondHighest}`);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const banks = input.split("\n").map((bank) => bank.split("").map(Number));

  return banks.map(getJoltage).reduce(sum);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
